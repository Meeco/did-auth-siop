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
exports.RP = void 0;
const ajv_1 = __importDefault(require("ajv"));
const AuthenticationRequest_1 = __importDefault(require("./AuthenticationRequest"));
const AuthenticationResponse_1 = __importDefault(require("./AuthenticationResponse"));
const RPBuilder_1 = __importDefault(require("./RPBuilder"));
const functions_1 = require("./functions");
const DIDResolution_1 = require("./functions/DIDResolution");
const AuthenticationRequestOpts_schema_1 = require("./schemas/AuthenticationRequestOpts.schema");
const SIOP_types_1 = require("./types/SIOP.types");
const ajv = new ajv_1.default();
const validate = ajv.compile(AuthenticationRequestOpts_schema_1.AuthenticationRequestOptsSchema);
class RP {
    constructor(opts) {
        var _a;
        const claims = (_a = opts.builder) === null || _a === void 0 ? void 0 : _a.claims;
        this._authRequestOpts = Object.assign({ claims }, createRequestOptsFromBuilderOrExistingOpts(opts));
        this._verifyAuthResponseOpts = Object.assign({ claims }, createVerifyResponseOptsFromBuilderOrExistingOpts(opts));
    }
    get authRequestOpts() {
        return this._authRequestOpts;
    }
    get verifyAuthResponseOpts() {
        return this._verifyAuthResponseOpts;
    }
    createAuthenticationRequest(opts) {
        return AuthenticationRequest_1.default.createURI(this.newAuthenticationRequestOpts(opts));
    }
    verifyAuthenticationResponseJwt(jwt, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return AuthenticationResponse_1.default.verifyJWT(jwt, this.newVerifyAuthenticationResponseOpts(opts));
        });
    }
    newAuthenticationRequestOpts(opts) {
        const state = (opts === null || opts === void 0 ? void 0 : opts.state) || functions_1.State.getState(opts === null || opts === void 0 ? void 0 : opts.state);
        const nonce = (opts === null || opts === void 0 ? void 0 : opts.nonce) || functions_1.State.getNonce(state, opts === null || opts === void 0 ? void 0 : opts.nonce);
        return Object.assign(Object.assign({}, this._authRequestOpts), { state,
            nonce });
    }
    newVerifyAuthenticationResponseOpts(opts) {
        return Object.assign(Object.assign({}, this._verifyAuthResponseOpts), { audience: opts.audience, state: (opts === null || opts === void 0 ? void 0 : opts.state) || this._verifyAuthResponseOpts.state, nonce: (opts === null || opts === void 0 ? void 0 : opts.nonce) || this._verifyAuthResponseOpts.nonce, claims: Object.assign(Object.assign({}, this._verifyAuthResponseOpts.claims), opts.claims), verification: (opts === null || opts === void 0 ? void 0 : opts.verification) || this._verifyAuthResponseOpts.verification });
    }
    static fromRequestOpts(opts) {
        return new RP({ requestOpts: opts });
    }
    static builder() {
        return new RPBuilder_1.default();
    }
}
exports.RP = RP;
function createRequestOptsFromBuilderOrExistingOpts(opts) {
    const requestOpts = opts.builder
        ? {
            registration: opts.builder.requestRegistration,
            redirectUri: opts.builder.redirectUri,
            requestBy: opts.builder.requestObjectBy,
            signatureType: opts.builder.signatureType,
            responseMode: opts.builder.responseMode,
            responseContext: opts.builder.responseContext,
            claims: opts.builder.claims,
        }
        : opts.requestOpts;
    const valid = validate(requestOpts);
    if (!valid) {
        throw new Error('RP builder validation error: ' + JSON.stringify(validate.errors));
    }
    return requestOpts;
}
function createVerifyResponseOptsFromBuilderOrExistingOpts(opts) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUlAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFpbi9SUC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0I7QUFFdEIsb0ZBQTREO0FBQzVELHNGQUE4RDtBQUM5RCw0REFBb0M7QUFDcEMsMkNBQW9DO0FBQ3BDLDZEQUF3RDtBQUN4RCxpR0FBNkY7QUFFN0YsbURBVTRCO0FBRTVCLE1BQU0sR0FBRyxHQUFHLElBQUksYUFBRyxFQUFFLENBQUM7QUFDdEIsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxrRUFBK0IsQ0FBQyxDQUFDO0FBRTlELE1BQWEsRUFBRTtJQUliLFlBQW1CLElBQXFIOztRQUN0SSxNQUFNLE1BQU0sR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLE1BQU0sQ0FBQztRQUNwQyxJQUFJLENBQUMsZ0JBQWdCLG1CQUFLLE1BQU0sSUFBSywwQ0FBMEMsQ0FBQyxJQUFJLENBQUMsQ0FBRSxDQUFDO1FBQ3hGLElBQUksQ0FBQyx1QkFBdUIsbUJBQUssTUFBTSxJQUFLLGlEQUFpRCxDQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7SUFDeEcsQ0FBQztJQUVELElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxzQkFBc0I7UUFDeEIsT0FBTyxJQUFJLENBQUMsdUJBQXVCLENBQUM7SUFDdEMsQ0FBQztJQUVNLDJCQUEyQixDQUFDLElBQXlDO1FBQzFFLE9BQU8sK0JBQXFCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFWSwrQkFBK0IsQ0FDMUMsR0FBVyxFQUNYLElBTUM7O1lBRUQsT0FBTyxnQ0FBc0IsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMs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