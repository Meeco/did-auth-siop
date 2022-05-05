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
const AuthenticationRequest_1 = __importDefault(require("./AuthenticationRequest"));
const AuthenticationResponseRegistration_1 = require("./AuthenticationResponseRegistration");
const PresentationExchange_1 = require("./PresentationExchange");
const functions_1 = require("./functions");
const DidJWT_1 = require("./functions/DidJWT");
const Keys_1 = require("./functions/Keys");
const types_1 = require("./types");
const SIOP_types_1 = require("./types/SIOP.types");
class AuthenticationResponse {
    /**
     * Creates a SIOP Response Object
     *
     * @param requestJwt
     * @param responseOpts
     * @param verifyOpts
     */
    static createJWTFromRequestJWT(requestJwt, responseOpts, verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            assertValidResponseOpts(responseOpts);
            if (!requestJwt || !requestJwt.startsWith('ey')) {
                throw new Error(types_1.SIOPErrors.NO_JWT);
            }
            const verifiedJWT = yield AuthenticationRequest_1.default.verifyJWT(requestJwt, verifyOpts);
            return AuthenticationResponse.createJWTFromVerifiedRequest(verifiedJWT, responseOpts);
        });
    }
    static createJWTFromVerifiedRequest(verifiedJwt, responseOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield createSIOPResponsePayload(verifiedJwt, responseOpts);
            yield assertValidVerifiablePresentations(verifiedJwt.presentationDefinitions, payload);
            const jwt = yield (0, DidJWT_1.signDidJwtPayload)(payload, responseOpts);
            return {
                jwt,
                state: payload.state,
                nonce: payload.nonce,
                payload,
                responseOpts,
            };
            // todo add uri generation support in separate method, like in the AuthRequest class
            /*if (isInternalSignature(responseOpts.signatureType)) {
                                                            return DIDJwt.signDidJwtInternal(payload, ResponseIss.SELF_ISSUED_V2, responseOpts.signatureType.hexPrivateKey, responseOpts.signatureType.kid);
                                                        } else if (isExternalSignature(responseOpts.signatureType)) {
                                                            return DIDJwt.signDidJwtExternal(payload, responseOpts.signatureType.signatureUri, responseOpts.signatureType.authZToken, responseOpts.signatureType.kid);
                                                        } else {
                                                            throw new Error("INVALID_SIGNATURE_TYPE");
                                                        }*/
            /*const params = `id_token=${JWT}`;
                                                        const uriResponse = {
                                                            encodedUri: "",
                                                            bodyEncoded: "",
                                                            encodingFormat: SIOP.UrlEncodingFormat.FORM_URL_ENCODED,
                                                            responseMode: didAuthResponseCall.responseMode
                                                                ? didAuthResponseCall.responseMode
                                                                : SIOP.ResponseMode.FRAGMENT, // FRAGMENT is the default
                                                        };
        
                                                        if (didAuthResponseCall.responseMode === SIOP.ResponseMode.FORM_POST) {
                                                            uriResponse.encodedUri = encodeURI(didAuthResponseCall.redirectUri);
                                                            uriResponse.bodyEncoded = encodeURI(params);
                                                        } else if (didAuthResponseCall.responseMode === SIOP.ResponseMode.QUERY) {
                                                            uriResponse.encodedUri = encodeURI(`${didAuthResponseCall.redirectUri}?${params}`);
                                                        } else {
                                                            uriResponse.responseMode = SIOP.ResponseMode.FRAGMENT;
                                                            uriResponse.encodedUri = encodeURI(`${didAuthResponseCall.redirectUri}#${params}`);
                                                        }
                                                        return uriResponse;*/
        });
    }
    /**
     * Verifies a SIOP ID Response JWT on the RP Side
     *
     * @param jwt ID token to be validated
     * @param verifyOpts
     */
    static verifyJWT(jwt, verifyOpts) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!jwt) {
                throw new Error(types_1.SIOPErrors.NO_JWT);
            }
            assertValidVerifyOpts(verifyOpts);
            const { header, payload } = functions_1.DIDJwt.parseJWT(jwt);
            assertValidResponseJWT({ header, payload });
            const verifiedJWT = yield (0, DidJWT_1.verifyDidJWT)(jwt, functions_1.DIDres.getResolver(verifyOpts.verification.resolveOpts), {
                audience: verifyOpts.audience,
            });
            const issuerDid = functions_1.DIDJwt.getIssuerDidFromPayload(payload);
            const verPayload = verifiedJWT.payload;
            assertValidResponseJWT({ header, verPayload: verPayload, audience: verifyOpts.audience });
            yield assertValidVerifiablePresentations((_a = verifyOpts === null || verifyOpts === void 0 ? void 0 : verifyOpts.claims) === null || _a === void 0 ? void 0 : _a.presentationDefinitions, verPayload);
            return {
                signer: verifiedJWT.signer,
                didResolutionResult: verifiedJWT.didResolutionResult,
                jwt,
                verifyOpts,
                issuer: issuerDid,
                payload: Object.assign({}, verPayload),
            };
        });
    }
}
exports.default = AuthenticationResponse;
function assertValidResponseJWT(opts) {
    if (!opts.header) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    if (opts.payload) {
        if (opts.payload.iss !== types_1.SIOP.ResponseIss.SELF_ISSUED_V2) {
            throw new Error(`${types_1.SIOPErrors.NO_SELFISSUED_ISS}, got: ${opts.payload.iss}`);
        }
    }
    if (opts.verPayload) {
        if (!opts.verPayload.nonce) {
            throw Error(types_1.SIOPErrors.NO_NONCE);
        }
        else if (!opts.verPayload.sub_type) {
            throw Error(types_1.SIOPErrors.NO_SUB_TYPE);
        }
        else if (!opts.verPayload.exp || opts.verPayload.exp < Date.now() / 1000) {
            throw Error(types_1.SIOPErrors.EXPIRED);
            /*} else if (!opts.verPayload.iat || opts.verPayload.iat > (Date.now() / 1000)) {
                        throw Error(SIOPErrors.EXPIRED);*/
            // todo: Add iat check
        }
        if ((opts.verPayload.aud && !opts.audience) || (!opts.verPayload.aud && opts.audience)) {
            throw Error(types_1.SIOPErrors.BAD_PARAMS);
        }
        else if (opts.audience && opts.audience != opts.verPayload.aud) {
            throw Error(types_1.SIOPErrors.INVALID_AUDIENCE);
        }
    }
}
function createThumbprintAndJWK(resOpts) {
    return __awaiter(this, void 0, void 0, function* () {
        let thumbprint;
        let subJwk;
        if (types_1.SIOP.isInternalSignature(resOpts.signatureType)) {
            thumbprint = (0, Keys_1.getThumbprint)(resOpts.signatureType.hexPrivateKey, resOpts.did);
            subJwk = (0, Keys_1.getPublicJWKFromHexPrivateKey)(resOpts.signatureType.hexPrivateKey, resOpts.signatureType.kid || `${resOpts.signatureType.did}#key-1`, resOpts.did);
            /*  } else if (SIOP.isExternalSignature(resOpts.signatureType)) {
                            const didDocument = await fetchDidDocument(resOpts.registration.registrationBy.referenceUri as string);
                            if (!didDocument.verificationMethod || didDocument.verificationMethod.length == 0) {
                              throw Error(SIOPErrors.VERIFY_BAD_PARAMS);
                            }
                            thumbprint = getThumbprintFromJwk(didDocument.verificationMethod[0].publicKeyJwk as JWK, resOpts.did);
                            subJwk = didDocument.verificationMethod[0].publicKeyJwk as JWK;*/
        }
        else if (types_1.SIOP.isSuppliedSignature(resOpts.signatureType)) {
            return { thumbprint, subJwk };
        }
        else {
            throw new Error(types_1.SIOPErrors.SIGNATURE_OBJECT_TYPE_NOT_SET);
        }
        return { thumbprint, subJwk };
    });
}
function extractPresentations(resOpts) {
    const presentationPayloads = resOpts.vp && resOpts.vp.length > 0
        ? resOpts.vp
            .filter((vp) => vp.location === SIOP_types_1.PresentationLocation.ID_TOKEN)
            .map((vp) => vp)
        : undefined;
    const vp_tokens = resOpts.vp && resOpts.vp.length > 0
        ? resOpts.vp
            .filter((vp) => vp.location === SIOP_types_1.PresentationLocation.VP_TOKEN)
            .map((vp) => vp)
        : undefined;
    let vp_token;
    if (vp_tokens) {
        if (vp_tokens.length == 1) {
            vp_token = vp_tokens[0];
        }
        else if (vp_tokens.length > 1) {
            throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
        }
    }
    const verifiable_presentations = presentationPayloads && presentationPayloads.length > 0 ? presentationPayloads : undefined;
    return {
        verifiable_presentations,
        vp_token,
    };
}
function createSIOPResponsePayload(verifiedJwt, resOpts) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        assertValidResponseOpts(resOpts);
        if (!verifiedJwt || !verifiedJwt.jwt) {
            throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
        }
        const isDidSupported = (_b = (_a = verifiedJwt.payload.registration) === null || _a === void 0 ? void 0 : _a.subject_identifiers_supported) === null || _b === void 0 ? void 0 : _b.includes(SIOP_types_1.SubjectIdentifierType.DID);
        const { thumbprint, subJwk } = yield createThumbprintAndJWK(resOpts);
        const state = resOpts.state || functions_1.State.getState(verifiedJwt.payload.state);
        const nonce = resOpts.nonce || functions_1.State.getNonce(state, resOpts.nonce);
        const registration = (0, AuthenticationResponseRegistration_1.createDiscoveryMetadataPayload)(resOpts.registration);
        // *********************************************************************************
        // todo We are missing a wrapper object. Actually the current object is the id_token
        // *********************************************************************************
        const { verifiable_presentations, vp_token } = extractPresentations(resOpts);
        return {
            iss: types_1.SIOP.ResponseIss.SELF_ISSUED_V2,
            sub: isDidSupported && resOpts.did ? resOpts.did : thumbprint,
            aud: verifiedJwt.payload.redirect_uri,
            did: resOpts.did,
            sub_type: isDidSupported && resOpts.did ? SIOP_types_1.SubjectIdentifierType.DID : SIOP_types_1.SubjectIdentifierType.JKT,
            sub_jwk: subJwk,
            state,
            nonce,
            iat: Date.now() / 1000,
            exp: Date.now() / 1000 + (resOpts.expiresIn || 600),
            registration,
            vp_token,
            verifiable_presentations,
        };
    });
}
function assertValidResponseOpts(opts) {
    if (!opts /*|| !opts.redirectUri*/ || !opts.signatureType /*|| !opts.nonce*/ || !opts.did) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    else if (!(types_1.SIOP.isInternalSignature(opts.signatureType) || types_1.SIOP.isExternalSignature(opts.signatureType) || types_1.SIOP.isSuppliedSignature(opts.signatureType))) {
        throw new Error(types_1.SIOPErrors.SIGNATURE_OBJECT_TYPE_NOT_SET);
    }
}
function assertValidVerifyOpts(opts) {
    if (!opts || !opts.verification || (!types_1.SIOP.isExternalVerification(opts.verification) && !types_1.SIOP.isInternalVerification(opts.verification))) {
        throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
    }
}
function assertValidVerifiablePresentations(definitions, verPayload) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((!definitions || definitions.length == 0) && !verPayload) {
            return;
        }
        // const definitions: PresentationDefinitionWithLocation[] = verifyOpts?.claims?.presentationDefinitions;
        PresentationExchange_1.PresentationExchange.assertValidPresentationDefintionWithLocations(definitions);
        let presentationPayloads;
        if (verPayload.verifiable_presentations && verPayload.verifiable_presentations.length > 0) {
            presentationPayloads = verPayload.verifiable_presentations;
        }
        if (verPayload.vp_token) {
            if (!presentationPayloads) {
                presentationPayloads = [verPayload.vp_token];
            }
            else {
                presentationPayloads.push(verPayload.vp_token);
            }
        }
        /*console.log('pd:', JSON.stringify(definitions));
        console.log('vps:', JSON.stringify(presentationPayloads));*/
        if (definitions && !presentationPayloads) {
            throw new Error(types_1.SIOPErrors.AUTH_REQUEST_EXPECTS_VP);
        }
        else if (!definitions && presentationPayloads) {
            throw new Error(types_1.SIOPErrors.AUTH_REQUEST_DOESNT_EXPECT_VP);
        }
        else if (definitions && presentationPayloads && definitions.length != presentationPayloads.length) {
            throw new Error(types_1.SIOPErrors.AUTH_REQUEST_EXPECTS_VP);
        }
        else if (definitions && presentationPayloads) {
            yield PresentationExchange_1.PresentationExchange.validatePayloadsAgainstDefinitions(definitions, presentationPayloads);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXNwb25zZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluL0F1dGhlbnRpY2F0aW9uUmVzcG9uc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFJQSxvRkFBNEQ7QUFDNUQsNkZBQXNGO0FBQ3RGLGlFQUE4RDtBQUM5RCwyQ0FBb0Q7QUFDcEQsK0NBQXFFO0FBQ3JFLDJDQUFnRjtBQUNoRixtQ0FBZ0Q7QUFDaEQsbURBUTRCO0FBRTVCLE1BQXFCLHNCQUFzQjtJQUN6Qzs7Ozs7O09BTUc7SUFDSCxNQUFNLENBQU8sdUJBQXVCLENBQ2xDLFVBQWtCLEVBQ2xCLFlBQTZDLEVBQzdDLFVBQWdEOztZQUVoRCx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3BDO1lBQ0QsTUFBTSxXQUFXLEdBQUcsTUFBTSwrQkFBcUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ2xGLE9BQU8sc0JBQXNCLENBQUMsNEJBQTRCLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3hGLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBTyw0QkFBNEIsQ0FDdkMsV0FBc0QsRUFDdEQsWUFBNkM7O1lBRTdDLE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQXlCLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzNFLE1BQU0sa0NBQWtDLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZGLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBQSwwQkFBaUIsRUFBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFD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