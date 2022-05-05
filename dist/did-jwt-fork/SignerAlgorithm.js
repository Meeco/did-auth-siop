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
exports.Ed25519SignerAlg = exports.ES256KSignerAlg = void 0;
const util_1 = require("./util");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfEcdsaSignature(object) {
    return typeof object === 'object' && 'r' in object && 's' in object;
}
function ES256KSignerAlg(recoverable) {
    return function sign(payload, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            const signature = yield signer(payload);
            if (instanceOfEcdsaSignature(signature)) {
                return (0, util_1.toJose)(signature, recoverable);
            }
            else {
                if (recoverable && typeof (0, util_1.fromJose)(signature).recoveryParam === 'undefined') {
                    throw new Error(`not_supported: ES256K-R not supported when signer doesn't provide a recovery param`);
                }
                return signature;
            }
        });
    };
}
exports.ES256KSignerAlg = ES256KSignerAlg;
function Ed25519SignerAlg() {
    return function sign(payload, signer) {
        return __awaiter(this, void 0, void 0, function* () {
            const signature = yield signer(payload);
            if (!instanceOfEcdsaSignature(signature)) {
                return signature;
            }
            else {
                throw new Error('invalid_config: expected a signer function that returns a string instead of signature object');
            }
        });
    };
}
exports.Ed25519SignerAlg = Ed25519SignerAlg;
const algorithms = {
    ES256K: ES256KSignerAlg(),
    // This is a non-standard algorithm but retained for backwards compatibility
    // see https://github.com/decentralized-identity/did-jwt/issues/146
    'ES256K-R': ES256KSignerAlg(true),
    // This is actually incorrect but retained for backwards compatibility
    // see https://github.com/decentralized-identity/did-jwt/issues/130
    Ed25519: Ed25519SignerAlg(),
    EdDSA: Ed25519SignerAlg(),
};
function SignerAlg(alg) {
    const impl = algorithms[alg];
    if (!impl)
        throw new Error(`not_supported: Unsupported algorithm ${alg}`);
    return impl;
}
exports.default = SignerAlg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lnbmVyQWxnb3JpdGhtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RpZC1qd3QtZm9yay9TaWduZXJBbGdvcml0aG0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsaUNBQXlEO0FBRXpELDhEQUE4RDtBQUM5RCxTQUFTLHdCQUF3QixDQUFDLE1BQVc7SUFDekMsT0FBTyxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksR0FBRyxJQUFJLE1BQU0sSUFBSSxHQUFHLElBQUksTUFBTSxDQUFBO0FBQ3ZFLENBQUM7QUFFRCxTQUFnQixlQUFlLENBQUMsV0FBcUI7SUFDakQsT0FBTyxTQUFlLElBQUksQ0FBQyxPQUFlLEVBQUUsTUFBYzs7WUFDdEQsTUFBTSxTQUFTLEdBQTRCLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQ2hFLElBQUksd0JBQXdCLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3JDLE9BQU8sSUFBQSxhQUFNLEVBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFBO2FBQ3hDO2lCQUFNO2dCQUNILElBQUksV0FBVyxJQUFJLE9BQU8sSUFBQSxlQUFRLEVBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxLQUFLLFdBQVcsRUFBRTtvQkFDekUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRkFBb0YsQ0FBQyxDQUFBO2lCQUN4RztnQkFDRCxPQUFPLFNBQVMsQ0FBQTthQUNuQjtRQUNMLENBQUM7S0FBQSxDQUFBO0FBQ0wsQ0FBQztBQVpELDBDQVlDO0FBRUQsU0FBZ0IsZ0JBQWdCO0lBQzVCLE9BQU8sU0FBZSxJQUFJLENBQUMsT0FBZSxFQUFFLE1BQWM7O1lBQ3RELE1BQU0sU0FBUyxHQUE0QixNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUNoRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3RDLE9BQU8sU0FBUyxDQUFBO2FBQ25CO2lCQUFNO2dCQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsOEZBQThGLENBQUMsQ0FBQTthQUNsSDtRQUNMLENBQUM7S0FBQSxDQUFBO0FBQ0wsQ0FBQztBQVRELDRDQVNDO0FBTUQsTUFBTSxVQUFVLEdBQXFCO0lBQ2pDLE1BQU0sRUFBRSxlQUFlLEVBQUU7SUFDekIsNEVBQTRFO0lBQzVFLG1FQUFtRTtJQUNuRSxVQUFVLEVBQUUsZUFBZSxDQUFDLElBQUksQ0FBQztJQUNqQyxzRUFBc0U7SUFDdEUsbUVBQW1FO0lBQ25FLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRTtJQUMzQixLQUFLLEVBQUUsZ0JBQWdCLEVBQUU7Q0FDNUIsQ0FBQTtBQUVELFNBQVMsU0FBUyxDQUFDLEdBQVc7SUFDMUIsTUFBTSxJQUFJLEdBQW9CLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUM3QyxJQUFJLENBQUMsSUFBSTtRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDekUsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO0FBRUQsa0JBQWUsU0FBUyxDQUFBIn0=