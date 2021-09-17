import base58 from 'bs58';
import { ES256KSigner } from 'did-jwt';
import { Resolvable } from 'did-resolver';
import { secp256k1 } from 'elliptic';
import js_base64 from 'js-base64';
import uuid from 'uuid';

import { createDidJWT, verifyDidJWT } from './did/DidJWT';
import { AkeResponse } from './types/AuthKeyExchange-types';
import { DidAuthValidationResponse } from './types/DidAuth-types';
import { JWTPayload } from './types/JWT-types';
import { bytesToHexString } from './util/Encodings';
import { encrypt } from './util/KeyUtils';

const defaultExpiration = {
  requestToken: 20,
  accessToken: 600, // 10 minutes
};

export class RPSession {
  private resolver: Resolvable;

  private readonly kid: string;
  private readonly did: string;
  private readonly audience: string;
  private readonly expiration: {
    requestToken: number;
    accessToken: number;
  };
  private readonly privateKey: string;

  constructor(opts?: {
    resolver: Resolvable;
    privateKey?: string;
    kid?: string;
    did?: string;
    audience?: string;
    expiration?: {
      requestToken: number;
      accessToken: number;
    };
  }) {
    this.setResolver(opts.resolver);
    this.expiration = opts.expiration !== null ? opts.expiration : defaultExpiration;

    this.audience = opts.audience;
    this.kid = opts.kid;
    this.did = opts.did;
    this.privateKey = opts.privateKey;
  }

  /**
   * Sets the resolver to use for Relying Party Auth
   * @param resolver
   */
  setResolver(resolver: Resolvable) {
    this.resolver = resolver;
  }

  /**
   * Verifies the bearer access token on the RP side as received from the OP/client
   *
   * @param accessToken
   */
  async verifyAccessToken(token: string): Promise<JWTPayload> {
    const verifiedJWT = await verifyDidJWT(token, this.resolver, { audience: this.audience });

    if (this.did !== verifiedJWT.issuer) {
      throw new Error(`Invalid iss ${verifiedJWT.issuer}. Expected ${this.did}`);
    }

    return verifiedJWT.payload;
  }

  /**
   * Creates an access token as a JWS placed in an AKE response
   *
   * @param validation
   * @param opts
   */
  async createAccessToken(
    validation: DidAuthValidationResponse,
    opts?: { [key: string]: string | number }
  ): Promise<AkeResponse> {
    const { payload } = validation;
    const headerOpts = {
      alg: 'ES256K',
      kid: this.kid,
    };
    const jwtOpts = {
      issuer: this.did,
      signer: ES256KSigner(this.privateKey),
      expiresIn: this.expiration.accessToken,
    };
    const accessToken = await createDidJWT(
      {
        sub: payload.did,
        aud: this.audience,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + this.expiration.accessToken,
        nonce: uuid.v4(),
        login_hint: 'did_siop',
        ...opts,
      },
      jwtOpts,
      headerOpts
    );

    let publicKey;
    const { publicKeyHex, publicKeyJwk, publicKeyBase58 } = validation.signer;
    if (publicKeyHex) {
      publicKey = publicKeyHex;
    } else if (publicKeyJwk) {
      publicKey = secp256k1
        .keyFromPublic({
          x: bytesToHexString(js_base64.Base64.toUint8Array(publicKeyJwk.x || '')),
          y: bytesToHexString(js_base64.Base64.toUint8Array(publicKeyJwk.y || '')),
        })
        .getPublic('hex');
    } else if (publicKeyBase58) {
      publicKey = bytesToHexString(base58.decode(publicKeyBase58));
    } else {
      throw new Error('The did does not contain a public key needed to encrypt');
    }

    const encryptedAccessToken = await encrypt(
      {
        access_token: accessToken,
        did: this.did,
        nonce: payload.nonce,
      },
      publicKey
    );

    const akeSignedJwt = await createDidJWT(
      {
        nonce: payload.nonce,
        encrypted_access_token: encryptedAccessToken,
        did: payload.did,
      },
      jwtOpts,
      headerOpts
    );

    const signedPayloadBase64url = akeSignedJwt.split('.')[1];
    const signedPayload = JSON.parse(js_base64.Base64.decode(signedPayloadBase64url));
    const jwsDetached = akeSignedJwt.replace(signedPayloadBase64url, '');
    return {
      version: 1,
      encrypted_access_token: encryptedAccessToken,
      signed_payload: signedPayload,
      jws: jwsDetached,
      did: this.did,
    };
  }
}
