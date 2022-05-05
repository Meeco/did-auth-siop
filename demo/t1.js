const { RP, OP, SIOP, AuthenticationRequest } = require('../dist/main');

/**
 * ISSUES with @sphereon/did-auth-siop
 *
 * Hedera private key is Generated using 32 bytes but this library expect PK to be 64 bytes: https://github.com/Sphereon-Opensource/did-auth-siop/blob/develop/src/did-jwt-fork/signers/EdDSASigner.ts#L16
 * Library do not support latest verification method type: Ed25519VerificationKey2020: ( supports https://github.com/Sphereon-Opensource/did-auth-siop/blob/develop/src/did-jwt-fork/JWT.ts#L133)
 * Library do not know how to deal with multibase and extract public key for verification: https://github.com/Sphereon-Opensource/did-auth-siop/blob/develop/src/did-jwt-fork/VerifierAlgorithm.ts#L29
 *
 */

async function main() {
  const EXAMPLE_REDIRECT_URL = 'http://localhost:4200/siop/callback';
  const HEX_KEY = '6eca6e720afda2ae504e23a18940528dd1af6c3f947d516c8469ba878fd9e3ee';
  const DID = 'did:key:z6MkqWcKV6qKW36Qeiv4iwkky6ayNv8dm9171f2hkdvuZhBg';
  const KID = 'did:key:z6MkqWcKV6qKW36Qeiv4iwkky6ayNv8dm9171f2hkdvuZhBg#z6MkqWcKV6qKW36Qeiv4iwkky6ayNv8dm9171f2hkdvuZhBg';

  const opts = {
    redirectUri: EXAMPLE_REDIRECT_URL,
    requestBy: {
      type: SIOP.PassBy.VALUE,
    },
    signatureType: {
      hexPrivateKey: HEX_KEY,
      did: DID,
      kid: KID,
    },
    registration: {
      didMethodsSupported: ['did:key:'],
      subjectIdentifiersSupported: SIOP.SubjectIdentifierType.DID,
      registrationBy: {
        type: SIOP.PassBy.VALUE,
      },
    },
  };

  const result = await AuthenticationRequest.createURI(opts);

  const verifyOpts = {
    verification: {
      mode: SIOP.VerificationMode.INTERNAL,
      resolveOpts: {
        didMethods: ['key'],
        resolveUrl: 'http://localhost:3000/dids',
      },
    },
  };

  console.log(JSON.stringify(result.jwt));

  AuthenticationRequest.verifyJWT(result.jwt, verifyOpts).then((req) => {
    console.log(`issuer: ${req.issuer}`);
    console.log(JSON.stringify(req.signer));
  });
}

main();
