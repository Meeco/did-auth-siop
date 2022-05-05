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
const AuthenticationRequestRegistration_1 = require("./AuthenticationRequestRegistration");
const PresentationExchange_1 = require("./PresentationExchange");
const functions_1 = require("./functions");
const Encodings_1 = require("./functions/Encodings");
const types_1 = require("./types");
const SIOP_types_1 = require("./types/SIOP.types");
class AuthenticationRequest {
    /**
     * Create a signed URL encoded URI with a signed SIOP request token on RP side
     *
     * @param opts Request input data to build a  SIOP Request Token
     * @remarks This method is used to generate a SIOP request with info provided by the RP.
     * First it generates the request payload and then it creates the signed JWT, which is returned as a URI
     *
     * Normally you will want to use this method to create the request.
     */
    static createURI(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const { jwt, payload } = yield AuthenticationRequest.createJWT(opts);
            return createURIFromJWT(opts, payload, jwt);
        });
    }
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param uri
     */
    static parseURI(uri) {
        // We strip the uri scheme before passing it to the decode function
        return (0, Encodings_1.decodeUriAsJson)(uri.replace(/^.*:\/\/\??/, ''));
    }
    /**
     * Create a signed SIOP request as JWT on RP side, typically you will want to use the createURI version!
     *
     * @param opts Request input data to build a SIOP Request as JWT
     * @remarks This method is used to generate a SIOP request with info provided by the RP.
     * First it generates the request payload and then it creates the signed JWT.
     *
     * Normally you will want to use the createURI version. That creates a URI that includes the JWT from this method in the URI
     * If you do use this method, you can call the wrapInUri afterwards to get the URI
     */
    static createJWT(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const siopRequestPayload = createAuthenticationRequestPayload(opts);
            const { nonce, state } = siopRequestPayload;
            const jwt = yield functions_1.DIDJwt.signDidJwtPayload(siopRequestPayload, opts);
            return {
                jwt,
                nonce,
                state,
                payload: siopRequestPayload,
                opts: opts,
            };
        });
    }
    static wrapAsURI(request) {
        return createURIFromJWT(request.opts, request.payload, request.jwt);
    }
    /**
     * Verifies a SIOP Request JWT on OP side
     *
     * @param jwt
     * @param opts
     */
    static verifyJWT(jwt, opts) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            assertValidVerifyOpts(opts);
            if (!jwt) {
                throw new Error(types_1.SIOPErrors.NO_JWT);
            }
            const { header, payload } = functions_1.DIDJwt.parseJWT(jwt);
            assertValidRequestJWT(header, payload);
            const options = {
                audience: functions_1.DIDJwt.getAudience(jwt),
            };
            const verPayload = payload;
            if (opts.nonce && verPayload.nonce !== opts.nonce) {
                throw new Error(`${types_1.SIOPErrors.BAD_NONCE} payload: ${payload.nonce}, supplied: ${opts.nonce}`);
            }
            else if (((_a = verPayload.registration) === null || _a === void 0 ? void 0 : _a.subject_identifiers_supported) && verPayload.registration.subject_identifiers_supported.length == 0) {
                throw new Error(`${types_1.SIOPErrors.VERIFY_BAD_PARAMS}`);
            }
            const verifiedJWT = yield functions_1.DIDJwt.verifyDidJWT(jwt, functions_1.DIDres.getResolver(opts.verification.resolveOpts), options);
            if (!verifiedJWT || !verifiedJWT.payload) {
                throw Error(types_1.SIOPErrors.ERROR_VERIFYING_SIGNATURE);
            }
            const presentationDefinitions = PresentationExchange_1.PresentationExchange.findValidPresentationDefinitions(payload);
            return Object.assign(Object.assign({}, verifiedJWT), { verifyOpts: opts, presentationDefinitions, payload: verifiedJWT.payload });
        });
    }
}
exports.default = AuthenticationRequest;
/***************************************
 *
 * Helper functions are down below
 *
 ***************************************/
/**
 * Creates an URI Request
 * @param requestOpts Options to define the Uri Request
 * @param requestPayload
 * @param jwt
 * @param requestPayload
 * @param jwt
 */
function createURIFromJWT(requestOpts, requestPayload, jwt) {
    var _a;
    const schema = 'openid://';
    // Only used to validate if it contains a definition
    PresentationExchange_1.PresentationExchange.findValidPresentationDefinitions(requestPayload);
    const query = functions_1.Encodings.encodeJsonAsURI(requestPayload);
    switch ((_a = requestOpts.requestBy) === null || _a === void 0 ? void 0 : _a.type) {
        case types_1.SIOP.PassBy.REFERENCE:
            return {
                encodedUri: `${schema}?${query}&request_uri=${encodeURIComponent(requestOpts.requestBy.referenceUri)}`,
                encodingFormat: types_1.SIOP.UrlEncodingFormat.FORM_URL_ENCODED,
                requestOpts,
                requestPayload,
                jwt,
            };
        case types_1.SIOP.PassBy.VALUE:
            return {
                encodedUri: `${schema}?${query}&request=${jwt}`,
                encodingFormat: types_1.SIOP.UrlEncodingFormat.FORM_URL_ENCODED,
                requestOpts,
                requestPayload,
                jwt,
            };
    }
    throw new Error(types_1.SIOPErrors.REQUEST_OBJECT_TYPE_NOT_SET);
}
function assertValidRequestJWT(_header, _payload) {
    /*console.log(_header);
      console.log(_payload);*/
}
function assertValidVerifyOpts(opts) {
    if (!opts || !opts.verification || (!types_1.SIOP.isExternalVerification(opts.verification) && !types_1.SIOP.isInternalVerification(opts.verification))) {
        throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
    }
}
function assertValidRequestOpts(opts) {
    if (!opts || !opts.redirectUri) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    else if (!opts.requestBy) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    else if (opts.requestBy.type !== types_1.SIOP.PassBy.REFERENCE && opts.requestBy.type !== types_1.SIOP.PassBy.VALUE) {
        throw new Error(types_1.SIOPErrors.REQUEST_OBJECT_TYPE_NOT_SET);
    }
    else if (opts.requestBy.type === types_1.SIOP.PassBy.REFERENCE && !opts.requestBy.referenceUri) {
        throw new Error(types_1.SIOPErrors.NO_REFERENCE_URI);
    }
    (0, AuthenticationRequestRegistration_1.assertValidRequestRegistrationOpts)(opts.registration);
}
function createClaimsPayload(opts) {
    if (!opts || !opts.presentationDefinitions || opts.presentationDefinitions.length == 0) {
        return undefined;
    }
    let vp_token;
    let id_token;
    opts.presentationDefinitions.forEach((def) => {
        switch (def.location) {
            case SIOP_types_1.PresentationLocation.ID_TOKEN: {
                if (!id_token || !id_token.verifiable_presentations) {
                    id_token = { verifiable_presentations: [{ presentation_definition: def.definition }] };
                }
                else {
                    id_token.verifiable_presentations.push({ presentation_definition: def.definition });
                }
                return;
            }
            case SIOP_types_1.PresentationLocation.VP_TOKEN: {
                if (vp_token) {
                    // There can only be one definition in the vp_token according to the spec
                    throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
                }
                else {
                    vp_token = { presentation_definition: def.definition };
                }
                return;
            }
        }
    });
    const payload = {
        id_token,
        vp_token,
    };
    return payload;
}
function createAuthenticationRequestPayload(opts) {
    assertValidRequestOpts(opts);
    const state = functions_1.State.getState(opts.state);
    const registration = (0, AuthenticationRequestRegistration_1.createRequestRegistration)(opts.registration);
    const claims = createClaimsPayload(opts.claims);
    return Object.assign(Object.assign({ response_type: types_1.SIOP.ResponseType.ID_TOKEN, scope: types_1.SIOP.Scope.OPENID, client_id: opts.signatureType.did || opts.redirectUri, redirect_uri: opts.redirectUri, iss: opts.signatureType.did, response_mode: opts.responseMode || types_1.SIOP.ResponseMode.POST, response_context: opts.responseContext || types_1.SIOP.ResponseContext.RP, nonce: functions_1.State.getNonce(state, opts.nonce), state }, registration.requestRegistrationPayload), { claims });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXF1ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vQXV0aGVudGljYXRpb25SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBRUEsMkZBQW9IO0FBQ3BILGlFQUE4RDtBQUM5RCwyQ0FBK0Q7QUFDL0QscURBQXdEO0FBQ3hELG1DQUFnRDtBQUNoRCxtREFBZ0o7QUFFaEosTUFBcUIscUJBQXFCO0lBQ3hDOzs7Ozs7OztPQVFHO0lBQ0gsTUFBTSxDQUFPLFNBQVMsQ0FBQyxJQUFvQzs7WUFDekQsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRSxPQUFPLGdCQUFnQixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDOUMsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNILE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBVztRQUN6QixtRUFBbUU7UUFDbkUsT0FBTyxJQUFBLDJCQUFlLEVBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQWlDLENBQUM7SUFDekYsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBTyxTQUFTLENBQUMsSUFBb0M7O1lBQ3pELE1BQU0sa0JBQWtCLEdBQUcsa0NBQWtDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEUsTUFBTSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQztZQUM1QyxNQUFNLEdBQUcsR0FBRyxNQUFNLGtCQUFNLENBQUMsaUJBQWlCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFckUsT0FBTztnQkFDTCxHQUFHO2dCQUNILEtBQUs7Z0JBQ0wsS0FBSztnQkFDTCxPQUFPLEVBQUUsa0JBQWtCO2dCQUMz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