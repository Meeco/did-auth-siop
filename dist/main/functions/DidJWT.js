"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toSIOPRegistrationDidMethod = exports.getNetworkFromDid = exports.getMethodFromDid = exports.parseJWT = exports.getIssuerDidFromJWT = exports.isIssSelfIssued = exports.getIssuerDidFromPayload = exports.getAudience = exports.signDidJwtPayload = exports.createDidJWT = exports.verifyDidJWT = void 0;
const JWT_1 = require("../../did-jwt-fork/JWT");
const ES256KSigner_1 = require("../../did-jwt-fork/signers/ES256KSigner");
const EdDSASigner_1 = require("../../did-jwt-fork/signers/EdDSASigner");
const config_1 = require("../config");
const types_1 = require("../types");
const SIOP_types_1 = require("../types/SIOP.types");
const Encodings_1 = require("./Encodings");
const HttpUtils_1 = require("./HttpUtils");
const Keys_1 = require("./Keys");
const index_1 = require("./index");
/**
 *  Verifies given JWT. If the JWT is valid, the promise returns an object including the JWT, the payload of the JWT,
 *  and the did doc of the issuer of the JWT.
 *
 *  @example
 *  verifyDidJWT('did:eosio:example', resolver, {audience: '5A8bRWU3F7j3REx3vkJ...', callbackUrl: 'https://...'}).then(obj => {
 *      const did = obj.did                 // DIDres of signer
 *      const payload = obj.payload
 *      const doc = obj.doc                 // DIDres Document of signer
 *      const JWT = obj.JWT                 // JWT
 *      const signerKeyId = obj.signerKeyId // ID of key in DIDres document that signed JWT
 *      ...
 *  })
 *
 *  @param    {String}            jwt                   a JSON Web Token to verify
 *  @param    {Resolvable}        resolver
 *  @param    {JWTVerifyOptions}  [options]             Options
 *  @param    {String}            options.audience      DID of the recipient of the JWT
 *  @param    {String}            options.callbackUrl   callback url in JWT
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a response object or rejects with an error
 */
function verifyDidJWT(jwt, resolver, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, JWT_1.verifyJWT)(jwt, Object.assign({ resolver }, options));
    });
}
exports.verifyDidJWT = verifyDidJWT;
/**
 *  Creates a signed JWT given an address which becomes the issuer, a signer function, and a payload for which the signature is over.
 *
 *  @example
 *  const signer = ES256KSigner(process.env.PRIVATE_KEY)
 *  createJWT({address: '5A8bRWU3F7j3REx3vkJ...', signer}, {key1: 'value', key2: ..., ... }).then(JWT => {
 *      ...
 *  })
 *
 *  @param    {Object}            payload               payload object
 *  @param    {Object}            [options]             an unsigned credential object
 *  @param    {String}            options.issuer        The DID of the issuer (signer) of JWT
 *  @param    {Signer}            options.signer        a `Signer` function, Please see `ES256KSigner` or `EdDSASigner`
 *  @param    {boolean}           options.canonicalize  optional flag to canonicalize header and payload before signing
 *  @param    {Object}            header                optional object to specify or customize the JWT header
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a signed JSON Web Token or rejects with an error
 */
function createDidJWT(payload, { issuer, signer, expiresIn, canonicalize }, header) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, JWT_1.createJWT)(payload, { issuer, signer, alg: header.alg, expiresIn, canonicalize }, header);
    });
}
exports.createDidJWT = createDidJWT;
function signDidJwtPayload(payload, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const isResponse = (0, SIOP_types_1.isResponseOpts)(opts) || (0, SIOP_types_1.isResponsePayload)(payload);
        if (isResponse) {
            if (!payload.iss || payload.iss !== SIOP_types_1.ResponseIss.SELF_ISSUED_V2) {
                throw new Error(types_1.SIOPErrors.NO_SELFISSUED_ISS);
            }
        }
        if ((0, SIOP_types_1.isInternalSignature)(opts.signatureType)) {
            return signDidJwtInternal(payload, isResponse ? payload.iss : opts.signatureType.did, opts.signatureType.hexPrivateKey, opts.signatureType.kid);
        }
        else if ((0, SIOP_types_1.isExternalSignature)(opts.signatureType)) {
            return signDidJwtExternal(payload, opts.signatureType.signatureUri, opts.signatureType.authZToken, opts.signatureType.kid);
        }
        else if ((0, SIOP_types_1.isSuppliedSignature)(opts.signatureType)) {
            return signDidJwtSupplied(payload, isResponse ? payload.iss : opts.signatureType.did, opts.signatureType.signature, opts.signatureType.kid);
        }
        else {
            throw new Error(types_1.SIOPErrors.BAD_SIGNATURE_PARAMS);
        }
    });
}
exports.signDidJwtPayload = signDidJwtPayload;
function signDidJwtInternal(payload, issuer, hexPrivateKey, kid) {
    return __awaiter(this, void 0, void 0, function* () {
        const algo = (0, Keys_1.isEd25519DidKeyMethod)(issuer) || (0, Keys_1.isEd25519DidKeyMethod)(payload.kid) || (0, Keys_1.isEd25519JWK)(payload.sub_jwk) ? SIOP_types_1.KeyAlgo.EDDSA : SIOP_types_1.KeyAlgo.ES256K;
        // const request = !!payload.client_id;
        const signer = algo == SIOP_types_1.KeyAlgo.EDDSA
            ? (0, EdDSASigner_1.EdDSASigner)((0, Encodings_1.base58ToBase64String)(index_1.Keys.getBase58PrivateKeyFromHexPrivateKey(hexPrivateKey)))
            : (0, ES256KSigner_1.ES256KSigner)(hexPrivateKey.replace('0x', ''));
        const header = {
            alg: algo,
            kid: kid || `${payload.did}#keys-1`,
        };
        const options = {
            issuer,
            signer,
            expiresIn: types_1.SIOP.expirationTime,
        };
        return yield createDidJWT(Object.assign({}, payload), options, header);
    });
}
function signDidJwtExternal(payload, signatureUri, authZToken, kid) {
    return __awaiter(this, void 0, void 0, function* () {
        const alg = (0, Keys_1.isEd25519DidKeyMethod)(payload.did) || (0, Keys_1.isEd25519DidKeyMethod)(payload.iss) ? types_1.SIOP.KeyAlgo.EDDSA : types_1.SIOP.KeyAlgo.ES256K;
        const body = {
            issuer: payload.iss && payload.iss.includes('did:') ? payload.iss : payload.did,
            payload,
            type: alg === types_1.SIOP.KeyAlgo.EDDSA ? config_1.PROOF_TYPE_EDDSA : config_1.DEFAULT_PROOF_TYPE,
            expiresIn: SIOP_types_1.expirationTime,
            alg,
            selfIssued: payload.iss.includes(types_1.SIOP.ResponseIss.SELF_ISSUED_V2) ? payload.iss : undefined,
            kid,
        };
        const response = yield (0, HttpUtils_1.postWithBearerToken)(signatureUri, body, authZToken);
        return (yield response.json()).jws;
    });
}
function signDidJwtSupplied(payload, issuer, signer, kid) {
    return __awaiter(this, void 0, void 0, function* () {
        const algo = (0, Keys_1.isEd25519DidKeyMethod)(issuer) || (0, Keys_1.isEd25519DidKeyMethod)(payload.kid) || (0, Keys_1.isEd25519JWK)(payload.sub_jwk) ? SIOP_types_1.KeyAlgo.EDDSA : SIOP_types_1.KeyAlgo.ES256K;
        const header = {
            alg: algo,
            kid,
        };
        const options = {
            issuer,
            signer,
            expiresIn: types_1.SIOP.expirationTime,
        };
        return yield createDidJWT(Object.assign({}, payload), options, header);
    });
}
function getAudience(jwt) {
    const { payload } = (0, JWT_1.decodeJWT)(jwt);
    if (!payload) {
        throw new Error(types_1.SIOPErrors.NO_AUDIENCE);
    }
    else if (!payload.aud) {
        return undefined;
    }
    else if (Array.isArray(payload.aud)) {
        throw new Error(types_1.SIOPErrors.INVALID_AUDIENCE);
    }
    return payload.aud;
}
exports.getAudience = getAudience;
function assertIssSelfIssuedOrDid(payload) {
    if (!payload.iss || !(payload.iss.startsWith('did:') || isIssSelfIssued(payload))) {
        throw new Error(types_1.SIOPErrors.NO_ISS_DID);
    }
}
function getIssuerDidFromPayload(payload, header) {
    assertIssSelfIssuedOrDid(payload);
    if (isIssSelfIssued(payload)) {
        let did;
        if (payload.did) {
            did = payload.did;
        }
        if (!did && header && header.kid && header.kid.startsWith('did:')) {
            did = header.kid.split('#')[0];
        }
        if (did) {
            return did;
        }
    }
    return payload.iss;
}
exports.getIssuerDidFromPayload = getIssuerDidFromPayload;
function isIssSelfIssued(payload) {
    return payload.iss.includes(SIOP_types_1.ResponseIss.SELF_ISSUED_V1) || payload.iss.includes(SIOP_types_1.ResponseIss.SELF_ISSUED_V2);
}
exports.isIssSelfIssued = isIssSelfIssued;
function getIssuerDidFromJWT(jwt) {
    const { payload } = parseJWT(jwt);
    return getIssuerDidFromPayload(payload);
}
exports.getIssuerDidFromJWT = getIssuerDidFromJWT;
function parseJWT(jwt) {
    const decodedJWT = (0, JWT_1.decodeJWT)(jwt);
    const { payload, header } = decodedJWT;
    if (!payload || !header) {
        throw new Error(types_1.SIOPErrors.NO_ISS_DID);
    }
    return decodedJWT;
}
exports.parseJWT = parseJWT;
function getMethodFromDid(did) {
    if (!did) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    const split = did.split(':');
    if (split.length == 1 && did.length > 0) {
        return did;
    }
    else if (!did.startsWith('did:') || split.length < 2) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    return split[1];
}
exports.getMethodFromDid = getMethodFromDid;
function getNetworkFromDid(did) {
    const network = 'mainnet'; // default
    const split = did.split(':');
    if (!did.startsWith('did:') || split.length < 2) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    if (split.length === 4) {
        return split[2];
    }
    else if (split.length > 4) {
        return `${split[2]}:${split[3]}`;
    }
    return network;
}
exports.getNetworkFromDid = getNetworkFromDid;
/**
 * Since the OIDC SIOP spec incorrectly uses 'did:<method>:' and calls that a method, we have to fix it
 * @param didOrMethod
 */
function toSIOPRegistrationDidMethod(didOrMethod) {
    let prefix = didOrMethod;
    if (!didOrMethod.startsWith('did:')) {
        prefix = 'did:' + didOrMethod;
    }
    const split = prefix.split(':');
    return `${split[0]}:${split[1]}:`;
}
exports.toSIOPRegistrationDidMethod = toSIOPRegistrationDidMethod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlkSldULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vZnVuY3Rpb25zL0RpZEpXVC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQSxnREFBMEk7QUFDMUksMEVBQXVFO0FBQ3ZFLHdFQUFxRTtBQUNyRSxzQ0FBaUU7QUFDakUsb0NBQWlEO0FBRWpELG9EQWM2QjtBQUU3QiwyQ0FBbUQ7QUFDbkQsMkNBQWtEO0FBQ2xELGlDQUE2RDtBQUU3RCxtQ0FBK0I7QUFFL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBc0IsWUFBWSxDQUFDLEdBQVcsRUFBRSxRQUFvQixFQUFFLE9BQXlCOztRQUM3RixPQUFPLElBQUEsZUFBUyxFQUFDLEdBQUcsa0JBQUksUUFBUSxJQUFLLE9BQU8sRUFBRyxDQUFDO0lBQ2xELENBQUM7Q0FBQTtBQUZELG9DQUVDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFzQixZQUFZLENBQ2hDLE9BQTRCLEVBQzVCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFjLEVBQ3ZELE1BQTBCOztRQUUxQixPQUFPLElBQUEsZUFBUyxFQUFDLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2xHLENBQUM7Q0FBQTtBQU5ELG9DQU1DO0FBRUQsU0FBc0IsaUJBQWlCLENBQ3JDLE9BQXFFLEVBQ3JFLElBQTREOztRQUU1RCxNQUFNLFVBQVUsR0FBRyxJQUFBLDJCQUFjLEVBQUMsSUFBSSxDQUFDLElBQUksSUFBQSw4QkFBaUIsRUFBQyxPQUFPLENBQUMsQ0FBQztRQUN0RSxJQUFJLFVBQVUsRUFBRTtZQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FB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