const { RP, OP, SIOP } = require('../dist/main');

/**
 * ISSUES with @sphereon/did-auth-siop
 *
 * Hedera private key is Generated using 32 bytes but this library expect PK to be 64 bytes: https://github.com/Sphereon-Opensource/did-auth-siop/blob/develop/src/did-jwt-fork/signers/EdDSASigner.ts#L16
 * Library do not support latest verification method type: Ed25519VerificationKey2020: ( supports https://github.com/Sphereon-Opensource/did-auth-siop/blob/develop/src/did-jwt-fork/JWT.ts#L133)
 * Library do not know how to deal with multibase and extract public key for verification: https://github.com/Sphereon-Opensource/did-auth-siop/blob/develop/src/did-jwt-fork/VerifierAlgorithm.ts#L29
 *
 */

async function main() {
  // The relying party (web) private key and DID and DID key (public key)
  const rpKeys = {
    hexPrivateKey: 'bb7d4d7d956a4ea4d89a79df66d8bf415b57a0182e604f5a75703757dcbb47b1',
    did: 'did:key:z6MkicfnX9jNJB7whQJoMeqwgYmLerKphQDwwtTzRBf4KCVQ',
    didKey: 'did:key:z6MkicfnX9jNJB7whQJoMeqwgYmLerKphQDwwtTzRBf4KCVQ#z6MkicfnX9jNJB7whQJoMeqwgYmLerKphQDwwtTzRBf4KCVQ',
  };
  const rp = RP.builder()
    .redirect('localhost:4200/home.html')
    .requestBy(SIOP.PassBy.VALUE)
    .internalSignature(rpKeys.hexPrivateKey, rpKeys.did, rpKeys.didKey)
    .addDidMethod('key')
    .registrationBy(SIOP.PassBy.VALUE)
    .addPresentationDefinitionClaim({
      definition: {
        id: '9a809146-4ea5-4bd4-bcd8-4e6c28c347af',
        input_descriptors: [
          {
            id: '8d78910f-d5b5-4db5-81fe-44dfabd5559a',
            schema: [
              {
                uri: 'https://did.itsourweb.org:3000/smartcredential/Ontario-Health-Insurance-Plan',
              },
            ],
          },
        ],
      },
      location: SIOP.PresentationLocation.VP_TOKEN, // Toplevel vp_token response expected. This also can be ID_TOKEN
    })
    .build();

  const reqURI = await rp.createAuthenticationRequest();
  //console.log(reqURI.encodedUri);

  // The OpenID Provider (client) private key and DID and DID key (public key)
  const opKeys = {
    hexPrivateKey: 'ec51a77869393e119962427adbf9e7f466bbc2d87543cac2a632d358880a14e9',
    did: 'did:key:z6MkgznnpeVpgwd75EZT4ATAG85dKtau6XyWfUKKAJJ1saS7',
    didKey: 'did:key:z6MkgznnpeVpgwd75EZT4ATAG85dKtau6XyWfUKKAJJ1saS7#z6MkgznnpeVpgwd75EZT4ATAG85dKtau6XyWfUKKAJJ1saS7',
  };

  const op = OP.builder()
    .withExpiresIn(6000)
    .addDidMethod('key')
    .internalSignature(opKeys.hexPrivateKey, opKeys.did, opKeys.didKey)
    .registrationBy(SIOP.PassBy.VALUE)
    .build();

  const parsedReqURI = op.parseAuthenticationRequestURI(reqURI.encodedUri);
  const parsedJWT = (await parsedReqURI).jwt;
  console.log(parsedJWT);

  //const verifiedReq = op.verifyAuthenticationRequest(reqURI.encodedUri);  // When an HTTP endpoint is used this would be the uri found in the body
  const verifiedReq = await op.verifyAuthenticationRequest(parsedJWT); // If we have parsed the URI using the above optional parsing

  console.log(`RP DID: ${verifiedReq.issuer}`);
}

main();
