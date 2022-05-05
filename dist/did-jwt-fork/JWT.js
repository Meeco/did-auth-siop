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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveAuthenticator = exports.verifyJWT = exports.verifyJWS = exports.createJWT = exports.createJWS = exports.decodeJWT = exports.NBF_SKEW = exports.SUPPORTED_PUBLIC_KEY_TYPES = void 0;
const canonicalize_1 = __importDefault(require("canonicalize"));
const util_1 = require("./util");
const SignerAlgorithm_1 = __importDefault(require("./SignerAlgorithm"));
const VerifierAlgorithm_1 = __importDefault(require("./VerifierAlgorithm"));
const SIOP_types_1 = require("../main/types/SIOP.types");
exports.SUPPORTED_PUBLIC_KEY_TYPES = {
    ES256K: [
        'EcdsaSecp256k1VerificationKey2019',
        /**
         * Equivalent to EcdsaSecp256k1VerificationKey2019 when key is an ethereumAddress
         */
        'EcdsaSecp256k1RecoveryMethod2020',
        /**
         * @deprecated, supported for backward compatibility. Equivalent to EcdsaSecp256k1VerificationKey2019 when key is not an ethereumAddress
         */
        'Secp256k1VerificationKey2018',
        /**
         * @deprecated, supported for backward compatibility. Equivalent to EcdsaSecp256k1VerificationKey2019 when key is not an ethereumAddress
         */
        'Secp256k1SignatureVerificationKey2018',
        /**
         * @deprecated, supported for backward compatibility. Equivalent to EcdsaSecp256k1VerificationKey2019 when key is not an ethereumAddress
         */
        'EcdsaPublicKeySecp256k1',
    ],
    'ES256K-R': [
        'EcdsaSecp256k1VerificationKey2019',
        /**
         * Equivalent to EcdsaSecp256k1VerificationKey2019 when key is an ethereumAddress
         */
        'EcdsaSecp256k1RecoveryMethod2020',
        /**
         * @deprecated, supported for backward compatibility. Equivalent to EcdsaSecp256k1VerificationKey2019 when key is not an ethereumAddress
         */
        'Secp256k1VerificationKey2018',
        /**
         * @deprecated, supported for backward compatibility. Equivalent to EcdsaSecp256k1VerificationKey2019 when key is not an ethereumAddress
         */
        'Secp256k1SignatureVerificationKey2018',
        /**
         * @deprecated, supported for backward compatibility. Equivalent to EcdsaSecp256k1VerificationKey2019 when key is not an ethereumAddress
         */
        'EcdsaPublicKeySecp256k1',
    ],
    Ed25519: ['ED25519SignatureVerification', 'Ed25519VerificationKey2018'],
    EdDSA: ['ED25519SignatureVerification', 'Ed25519VerificationKey2018'],
};
const defaultAlg = 'ES256K';
const DID_JSON = 'application/did+json';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function encodeSection(data, shouldCanonicalize = false) {
    if (shouldCanonicalize) {
        return (0, util_1.encodeBase64url)((0, canonicalize_1.default)(data));
    }
    else {
        return (0, util_1.encodeBase64url)(JSON.stringify(data));
    }
}
exports.NBF_SKEW = 300;
function decodeJWS(jws) {
    const parts = jws.match(/^([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+)\.([a-zA-Z0-9_-]+)$/);
    if (parts) {
        return {
            header: JSON.parse((0, util_1.decodeBase64url)(parts[1])),
            payload: parts[2],
            signature: parts[3],
            data: `${parts[1]}.${parts[2]}`,
        };
    }
    throw new Error('invalid_argument: Incorrect format JWS');
}
/**  @module did-jwt/JWT */
/**
 *  Decodes a JWT and returns an object representing the payload
 *
 *  @example
 *  decodeJWT('eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE1...')
 *
 *  @param    {String}            jwt                a JSON Web Token to verify
 *  @return   {Object}                               a JS object representing the decoded JWT
 */
function decodeJWT(jwt) {
    if (!jwt)
        throw new Error('invalid_argument: no JWT passed into decodeJWT');
    try {
        const jws = decodeJWS(jwt);
        const decodedJwt = Object.assign(jws, { payload: JSON.parse((0, util_1.decodeBase64url)(jws.payload)) });
        return decodedJwt;
    }
    catch (e) {
        throw new Error('invalid_argument: Incorrect format JWT');
    }
}
exports.decodeJWT = decodeJWT;
/**
 *  Creates a signed JWS given a payload, a signer, and an optional header.
 *
 *  @example
 *  const signer = ES256KSigner(process.env.PRIVATE_KEY)
 *  const jws = await createJWS({ my: 'payload' }, signer)
 *
 *  @param    {Object}            payload           payload object
 *  @param    {Signer}            signer            a signer, see `ES256KSigner or `EdDSASigner`
 *  @param    {Object}            header            optional object to specify or customize the JWS header
 *  @param    {Object}            options           can be used to trigger automatic canonicalization of header and
 *                                                    payload properties
 *  @return   {Promise<string>}                     a Promise which resolves to a JWS string or rejects with an error
 */
function createJWS(payload, signer, header = {}, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!header.alg)
            header.alg = defaultAlg;
        const encodedPayload = typeof payload === 'string' ? payload : encodeSection(payload, options.canonicalize);
        const signingInput = [encodeSection(header, options.canonicalize), encodedPayload].join('.');
        const jwtSigner = (0, SignerAlgorithm_1.default)(header.alg);
        const signature = yield jwtSigner(signingInput, signer);
        return [signingInput, signature].join('.');
    });
}
exports.createJWS = createJWS;
/**
 *  Creates a signed JWT given an address which becomes the issuer, a signer, and a payload for which the signature is over.
 *
 *  @example
 *  const signer = ES256KSigner(process.env.PRIVATE_KEY)
 *  createJWT({address: '5A8bRWU3F7j3REx3vkJ...', signer}, {key1: 'value', key2: ..., ... }).then(jwt => {
 *      ...
 *  })
 *
 *  @param    {Object}            payload               payload object
 *  @param    {Object}            [options]             an unsigned credential object
 *  @param    {String}            options.issuer        The DID of the issuer (signer) of JWT
 *  @param    {String}            options.alg           [DEPRECATED] The JWT signing algorithm to use. Supports: [ES256K, ES256K-R, Ed25519, EdDSA], Defaults to: ES256K.
 *                                                      Please use `header.alg` to specify the algorithm
 *  @param    {Signer}            options.signer        a `Signer` function, Please see `ES256KSigner` or `EdDSASigner`
 *  @param    {boolean}           options.canonicalize  optional flag to canonicalize header and payload before signing
 *  @param    {Object}            header                optional object to specify or customize the JWT header
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a signed JSON Web Token or rejects with an error
 */
function createJWT(payload, { issuer, signer, alg, expiresIn, canonicalize }, header = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!signer)
            throw new Error('missing_signer: No Signer functionality has been configured');
        if (!issuer)
            throw new Error('missing_issuer: No issuing DID has been configured');
        if (!header.typ)
            header.typ = 'JWT';
        if (!header.alg)
            header.alg = alg;
        const timestamps = {
            iat: Math.floor(Date.now() / 1000),
            exp: undefined,
        };
        if (expiresIn) {
            if (typeof expiresIn === 'number') {
                timestamps.exp = (payload.nbf || timestamps.iat) + Math.floor(expiresIn);
            }
            else {
                throw new Error('invalid_argument: JWT expiresIn is not a number');
            }
        }
        const fullPayload = Object.assign(Object.assign(Object.assign({}, timestamps), payload), { iss: issuer });
        return createJWS(fullPayload, signer, header, { canonicalize });
    });
}
exports.createJWT = createJWT;
function verifyJWSDecoded({ header, data, signature }, pubKeys) {
    if (!Array.isArray(pubKeys))
        pubKeys = [pubKeys];
    const signer = (0, VerifierAlgorithm_1.default)(header.alg)(data, signature, pubKeys);
    return signer;
}
/**
 *  Verifies given JWS. If the JWS is valid, returns the public key that was
 *  used to sign the JWS, or throws an `Error` if none of the `pubKeys` match.
 *
 *  @example
 *  const pubKey = verifyJWS('eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJyZXF1Z....', { publicKeyHex: '0x12341...' })
 *
 *  @param    {String}                          jws         A JWS string to verify
 *  @param    {Array<VerificationMethod> | VerificationMethod}    pubKeys     The public keys used to verify the JWS
 *  @return   {VerificationMethod}                       The public key used to sign the JWS
 */
function verifyJWS(jws, pubKeys) {
    const jwsDecoded = decodeJWS(jws);
    return verifyJWSDecoded(jwsDecoded, pubKeys);
}
exports.verifyJWS = verifyJWS;
/**
 *  SPHEREON: Copied from https://github.com/decentralized-identity/did-jwt/blob/6dc280389d9e3c2bf8ebba66f84269f7262d176f/src/JWT.ts#L305
 *  with changes to support SIOP V2 where the iss needs to be https://self-issued.me
 *
 *  Verifies given JWT. If the JWT is valid, the promise returns an object including the JWT, the payload of the JWT,
 *  and the did doc of the issuer of the JWT.
 *
 *  @example
 *  verifyJWT('did:uport:eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJyZXF1Z....', {audience: '5A8bRWU3F7j3REx3vkJ...', callbackUrl: 'https://...'}).then(obj => {
 *      const did = obj.did // DID of signer
 *      const payload = obj.payload
 *      const doc = obj.doc // DID Document of signer
 *      const jwt = obj.jwt
 *      const signerKeyId = obj.signerKeyId // ID of key in DID document that signed JWT
 *      ...
 *  })
 *
 *  @param    {String}            jwt                a JSON Web Token to verify
 *  @param    {Object}            [options]           an unsigned credential object
 *  @param    {Boolean}           options.auth        Require signer to be listed in the authentication section of the DID document (for Authentication purposes)
 *  @param    {String}            options.audience    DID of the recipient of the JWT
 *  @param    {String}            options.callbackUrl callback url in JWT
 *  @return   {Promise<Object, Error>}               a promise which resolves with a response object or rejects with an error
 */
function verifyJWT(jwt, options = {
    resolver: undefined,
    auth: undefined,
    audience: undefined,
    callbackUrl: undefined,
    skewTime: undefined,
    proofPurpose: undefined,
}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!options.resolver)
            throw new Error('missing_resolver: No DID resolver has been configured');
        const { payload, header, signature, data } = decodeJWT(jwt);
        const proofPurpose = Object.prototype.hasOwnProperty.call(options, 'auth')
            ? options.auth
                ? 'authentication'
                : undefined
            : options.proofPurpose;
        const { didResolutionResult, authenticators, issuer } = yield resolveAuthenticator(options.resolver, header.alg, !payload.iss || payload.iss.includes(SIOP_types_1.ResponseIss.SELF_ISSUED_V1) || payload.iss.includes(SIOP_types_1.ResponseIss.SELF_ISSUED_V2)
            ? payload.did
                ? payload.did
                : header.kid
            : payload.iss, // <=SPHEREON CHANGE
        proofPurpose);
        const signer = yield verifyJWSDecoded({ header, data, signature }, authenticators);
        const now = Math.floor(Date.now() / 1000);
        const skewTime = typeof options.skewTime !== 'undefined' && options.skewTime >= 0 ? options.skewTime : exports.NBF_SKEW;
        if (signer) {
            const nowSkewed = now + skewTime;
            if (payload.nbf) {
                if (payload.nbf > nowSkewed) {
                    throw new Error(`invalid_jwt: JWT not valid before nbf: ${payload.nbf}`);
                }
            }
            else if (payload.iat && payload.iat > nowSkewed) {
                throw new Error(`invalid_jwt: JWT not valid yet (issued in the future) iat: ${payload.iat}`);
            }
            if (payload.exp && payload.exp <= now - skewTime) {
                throw new Error(`invalid_jwt: JWT has expired: exp: ${payload.exp} < now: ${now}`);
            }
            if (payload.aud) {
                if (!options.audience && !options.callbackUrl) {
                    throw new Error('invalid_config: JWT audience is required but your app address has not been configured');
                }
                const audArray = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
                const matchedAudience = audArray.find((item) => options.audience === item || options.callbackUrl === item);
                if (typeof matchedAudience === 'undefined') {
                    throw new Error(`invalid_config: JWT audience does not match your DID or callback url`);
                }
            }
            return { payload, didResolutionResult, issuer, signer, jwt };
        }
        throw new Error(`invalid_signature: JWT not valid. issuer DID document does not contain a verificationMethod that matches the signature.`);
    });
}
exports.verifyJWT = verifyJWT;
/**
 * Resolves relevant public keys or other authenticating material used to verify signature from the DID document of provided DID
 *
 *  @example
 *  resolveAuthenticator(resolver, 'ES256K', 'did:uport:2nQtiQG6Cgm1GYTBaaKAgr76uY7iSexUkqX').then(obj => {
 *      const payload = obj.payload
 *      const profile = obj.profile
 *      const jwt = obj.jwt
 *      ...
 *  })
 *
 *  @param    {String}            alg                a JWT algorithm
 *  @param    {String}            did                a Decentralized IDentifier (DID) to lookup
 *  @param    {Boolean}           auth               Restrict public keys to ones specifically listed in the 'authentication' section of DID document
 *  @return   {Promise<DIDAuthenticator>}               a promise which resolves with a response object containing an array of authenticators or if non exist rejects with an error
 */
function resolveAuthenticator(resolver, alg, issuer, proofPurpose) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const types = exports.SUPPORTED_PUBLIC_KEY_TYPES[alg];
        if (!types || types.length === 0) {
            throw new Error(`not_supported: No supported signature types for algorithm ${alg}`);
        }
        let didResult;
        const result = (yield resolver.resolve(issuer, { accept: DID_JSON }));
        // support legacy resolvers that do not produce DIDResolutionResult
        if (Object.getOwnPropertyNames(result).indexOf('didDocument') === -1) {
            didResult = {
                didDocument: result,
                didDocumentMetadata: {},
                didResolutionMetadata: { contentType: DID_JSON },
            };
        }
        else {
            didResult = result;
        }
        if (((_a = didResult.didResolutionMetadata) === null || _a === void 0 ? void 0 : _a.error) || didResult.didDocument == null) {
            const { error, message } = didResult.didResolutionMetadata;
            throw new Error(`resolver_error: Unable to resolve DID document for ${issuer}: ${error}, ${message || ''}`);
        }
        const getPublicKeyById = (verificationMethods, pubid) => {
            const filtered = verificationMethods.filter(({ id }) => pubid === id);
            return filtered.length > 0 ? filtered[0] : null;
        };
        let publicKeysToCheck = [
            ...(((_b = didResult === null || didResult === void 0 ? void 0 : didResult.didDocument) === null || _b === void 0 ? void 0 : _b.verificationMethod) || []),
            ...(((_c = didResult === null || didResult === void 0 ? void 0 : didResult.didDocument) === null || _c === void 0 ? void 0 : _c.publicKey) || []),
        ];
        if (typeof proofPurpose === 'string') {
            // support legacy DID Documents that do not list assertionMethod
            if (proofPurpose.startsWith('assertion') &&
                !Object.getOwnPropertyNames(didResult === null || didResult === void 0 ? void 0 : didResult.didDocument).includes('assertionMethod')) {
                didResult.didDocument = Object.assign({}, didResult.didDocument);
                didResult.didDocument.assertionMethod = [...publicKeysToCheck.map((pk) => pk.id)];
            }
            publicKeysToCheck = (didResult.didDocument[proofPurpose] || [])
                .map((verificationMethod) => {
                if (typeof verificationMethod === 'string') {
                    return getPublicKeyById(publicKeysToCheck, verificationMethod);
                }
                else if (typeof verificationMethod.publicKey === 'string') {
                    // this is a legacy format
                    return getPublicKeyById(publicKeysToCheck, verificationMethod.publicKey);
                }
                else {
                    return verificationMethod;
                }
            })
                .filter((key) => key != null);
        }
        const authenticators = publicKeysToCheck.filter(({ type }) => types.find((supported) => supported === type));
        if (typeof proofPurpose === 'string' && (!authenticators || authenticators.length === 0)) {
            throw new Error(`no_suitable_keys: DID document for ${issuer} does not have public keys suitable for ${alg} with ${proofPurpose} purpose`);
        }
        if (!authenticators || authenticators.length === 0) {
            throw new Error(`no_suitable_keys: DID document for ${issuer} does not have public keys for ${alg}`);
        }
        return { authenticators, issuer, didResolutionResult: didResult };
    });
}
exports.resolveAuthenticator = resolveAuthenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSldULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RpZC1qd3QtZm9yay9KV1QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQTJDO0FBRTNDLGlDQUF3RTtBQUN4RSx3RUFBMEM7QUFDMUMsNEVBQW9EO0FBQ3BELHlEQUFxRDtBQXdGeEMsUUFBQSwwQkFBMEIsR0FBbUI7SUFDdEQsTUFBTSxFQUFFO1FBQ0osbUNBQW1DO1FBQ25DOztXQUVHO1FBQ0gsa0NBQWtDO1FBQ2xDOztXQUVHO1FBQ0gsOEJBQThCO1FBQzlCOztXQUVHO1FBQ0gsdUNBQXVDO1FBQ3ZDOztXQUVHO1FBQ0gseUJBQXlCO0tBQzVCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsbUNBQW1DO1FBQ25DOztXQUVHO1FBQ0gsa0NBQWtDO1FBQ2xDOztXQUVHO1FBQ0gsOEJBQThCO1FBQzlCOztXQUVHO1FBQ0gsdUNBQXVDO1FBQ3ZDOztXQUVHO1FBQ0gseUJBQXlCO0tBQzVCO0lBQ0QsT0FBTyxFQUFFLENBQUMsOEJBQThCLEVBQUUsNEJBQTRCLENBQUM7SUFDdkUsS0FBSyxFQUFFLENBQUMsOEJBQThCLEVBQUUsNEJBQTRCLENBQUM7Q0FDeEUsQ0FBQTtBQUlELE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQTtBQUMzQixNQUFNLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQTtBQUV2Qyw4REFBOEQ7QUFDOUQsU0FBUyxhQUFhLENBQUMsSUFBUyxFQUFFLGtCQUFrQixHQUFHLEtBQUs7SUFDeEQsSUFBSSxrQkFBa0IsRUFBRTtRQUNwQixPQUFPLElBQUEsc0JBQWUsRUFBUyxJQUFBLHNCQUFnQixFQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7S0FDekQ7U0FBTTtRQUNILE9BQU8sSUFBQSxzQkFBZSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtLQUMvQztBQUNMLENBQUM7QUFFWSxRQUFBLFFBQVEsR0FBRyxH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