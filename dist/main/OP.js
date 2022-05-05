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
exports.OP = void 0;
const ajv_1 = __importDefault(require("ajv"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const AuthenticationRequest_1 = __importDefault(require("./AuthenticationRequest"));
const AuthenticationResponse_1 = __importDefault(require("./AuthenticationResponse"));
const OPBuilder_1 = __importDefault(require("./OPBuilder"));
const DIDResolution_1 = require("./functions/DIDResolution");
const HttpUtils_1 = require("./functions/HttpUtils");
const AuthenticationResponseOpts_schema_1 = require("./schemas/AuthenticationResponseOpts.schema");
const types_1 = require("./types");
const SIOP_types_1 = require("./types/SIOP.types");
const ajv = new ajv_1.default();
const validate = ajv.compile(AuthenticationResponseOpts_schema_1.AuthenticationResponseOptsSchema);
class OP {
    constructor(opts) {
        this._authResponseOpts = Object.assign({}, createResponseOptsFromBuilderOrExistingOpts(opts));
        this._verifyAuthRequestOpts = Object.assign({}, createVerifyRequestOptsFromBuilderOrExistingOpts(opts));
    }
    get authResponseOpts() {
        return this._authResponseOpts;
    }
    get verifyAuthRequestOpts() {
        return this._verifyAuthRequestOpts;
    }
    postAuthenticationResponse(authenticationResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, HttpUtils_1.postAuthenticationResponse)(authenticationResponse.payload.aud, authenticationResponse);
        });
    }
    verifyAuthenticationRequest(requestJwtorUri, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwt = requestJwtorUri.startsWith('ey') ? requestJwtorUri : (yield parseAndResolveUri(requestJwtorUri)).jwt;
            const verifiedJwt = AuthenticationRequest_1.default.verifyJWT(jwt, this.newVerifyAuthenticationRequestOpts(opts));
            return verifiedJwt;
        });
    }
    createAuthenticationResponse(verifiedJwt, responseOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            return AuthenticationResponse_1.default.createJWTFromVerifiedRequest(verifiedJwt, this.newAuthenticationResponseOpts(responseOpts));
        });
    }
    submitAuthenticationResponse(verifiedJwt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!verifiedJwt ||
                (verifiedJwt.responseOpts.responseMode &&
                    !(verifiedJwt.responseOpts.responseMode == SIOP_types_1.ResponseMode.POST || verifiedJwt.responseOpts.responseMode == SIOP_types_1.ResponseMode.FORM_POST))) {
                throw new Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            return (0, HttpUtils_1.postAuthenticationResponseJwt)(verifiedJwt.payload.aud, verifiedJwt.jwt);
        });
    }
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param encodedUri
     */
    parseAuthenticationRequestURI(encodedUri) {
        return __awaiter(this, void 0, void 0, function* () {
            const { requestPayload, jwt, registration } = yield parseAndResolveUri(encodedUri);
            return {
                encodedUri,
                encodingFormat: SIOP_types_1.UrlEncodingFormat.FORM_URL_ENCODED,
                jwt,
                requestPayload,
                registration,
            };
        });
    }
    newAuthenticationResponseOpts(opts) {
        const state = opts === null || opts === void 0 ? void 0 : opts.state;
        const nonce = opts === null || opts === void 0 ? void 0 : opts.nonce;
        const vp = opts === null || opts === void 0 ? void 0 : opts.vp;
        const audience = opts === null || opts === void 0 ? void 0 : opts.audience;
        return Object.assign(Object.assign({ redirectUri: audience }, this._authResponseOpts), { nonce,
            state,
            vp });
    }
    newVerifyAuthenticationRequestOpts(opts) {
        return Object.assign(Object.assign({}, this._verifyAuthRequestOpts), { nonce: (opts === null || opts === void 0 ? void 0 : opts.nonce) || this._verifyAuthRequestOpts.nonce, verification: (opts === null || opts === void 0 ? void 0 : opts.verification) || this._verifyAuthRequestOpts.verification });
    }
    static fromOpts(responseOpts, verifyOpts) {
        return new OP({ responseOpts, verifyOpts });
    }
    static builder() {
        return new OPBuilder_1.default();
    }
}
exports.OP = OP;
function parseAndResolveUri(encodedUri) {
    return __awaiter(this, void 0, void 0, function* () {
        const requestPayload = AuthenticationRequest_1.default.parseURI(encodedUri);
        const jwt = requestPayload.request || (yield (yield (0, cross_fetch_1.default)(requestPayload.request_uri)).text());
        const registration = requestPayload.registration || (yield (yield (0, cross_fetch_1.default)(requestPayload.registration_uri)).json());
        return { requestPayload, jwt, registration };
    });
}
function createResponseOptsFromBuilderOrExistingOpts(opts) {
    const responseOpts = opts.builder
        ? {
            registration: opts.builder.responseRegistration,
            did: opts.builder.signatureType.did,
            expiresIn: opts.builder.expiresIn,
            signatureType: opts.builder.signatureType,
            responseMode: opts.builder.responseMode,
        }
        : Object.assign({}, opts.responseOpts);
    const valid = validate(responseOpts);
    if (!valid) {
        throw new Error('OP builder validation error: ' + JSON.stringify(validate.errors));
    }
    return responseOpts;
}
function createVerifyRequestOptsFromBuilderOrExistingOpts(opts) {
    return opts.builder
        ? {
            verification: {
                mode: SIOP_types_1.VerificationMode.INTERNAL,
                resolveOpts: {
                    didMethods: opts.builder.didMethods,
                    resolver: opts.builder.resolver ? (0, DIDResolution_1.getResolver)({ resolver: opts.builder.resolver }) : (0, DIDResolution_1.getResolver)({ didMethods: opts.builder.didMethods }),
                },
            },
        }
        : opts.verifyOpts;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFpbi9PUC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0I7QUFDdEIsOERBQWdDO0FBRWhDLG9GQUE0RDtBQUM1RCxzRkFBOEQ7QUFDOUQsNERBQW9DO0FBQ3BDLDZEQUF3RDtBQUN4RCxxREFBa0c7QUFDbEcsbUdBQStGO0FBQy9GLG1DQUEyQztBQUMzQyxtREFhNEI7QUFFNUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxhQUFHLEVBQUUsQ0FBQztBQUV0QixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLG9FQUFnQyxDQUFDLENBQUM7QUFFL0QsTUFBYSxFQUFFO0lBSWIsWUFBbUIsSUFBc0g7UUFDdkksSUFBSSxDQUFDLGlCQUFpQixxQkFBUSwyQ0FBMkMsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxzQkFBc0IscUJBQVEsZ0RBQWdELENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQztJQUM5RixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUVELElBQUkscUJBQXFCO1FBQ3ZCLE9BQU8sSUFBSSxDQUFDLHNCQUFzQixDQUFDO0lBQ3JDLENBQUM7SUFFWSwwQkFBMEIsQ0FBQyxzQkFBcUQ7O1lBQzNGLE9BQU8sSUFBQSxzQ0FBMEIsRUFBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDaEcsQ0FBQztLQUFBO0lBRVksMkJBQTJCLENBQ3RDLGVBQXVCLEVBQ3ZCLElBQXFGOztZQUVyRixNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxrQkFBa0IsQ0FBQyxlQUFl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