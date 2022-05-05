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
exports.ES256KSigner = void 0;
const util_1 = require("../util");
const util_2 = require("../util");
const Digest_1 = require("../Digest");
const elliptic_1 = __importDefault(require("elliptic"));
const secp256k1 = new elliptic_1.default.ec('secp256k1');
/**
 *  Creates a configured signer function for signing data using the ES256K (secp256k1 + sha256) algorithm.
 *
 *  The signing function itself takes the data as a `Uint8Array` or `string` and returns a `base64Url`-encoded signature
 *
 *  @example
 *  ```typescript
 *  const sign: Signer = ES256KSigner(process.env.PRIVATE_KEY)
 *  const signature: string = await sign(data)
 *  ```
 *
 *  @param    {String}    privateKey   a private key as `Uint8Array` or encoded as `base64`, `base58`, or `hex` string
 *  @param    {Boolean}   recoverable  an optional flag to add the recovery param to the generated signatures
 *  @return   {Function}               a configured signer function `(data: string | Uint8Array): Promise<string>`
 */
function ES256KSigner(privateKey, recoverable = false) {
    const privateKeyBytes = (0, util_1.parseKey)(privateKey);
    if (privateKeyBytes.length !== 32) {
        throw new Error(`bad_key: Invalid private key format. Expecting 32 bytes, but got ${privateKeyBytes.length}`);
    }
    const keyPair = secp256k1.keyFromPrivate(privateKeyBytes);
    return (data) => __awaiter(this, void 0, void 0, function* () {
        const { r, s, recoveryParam } = keyPair.sign((0, Digest_1.sha256)(data));
        return (0, util_2.toJose)({
            r: (0, util_1.leftpad)(r.toString('hex')),
            s: (0, util_1.leftpad)(s.toString('hex')),
            recoveryParam,
        }, recoverable);
    });
}
exports.ES256KSigner = ES256KSigner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRVMyNTZLU2lnbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RpZC1qd3QtZm9yay9zaWduZXJzL0VTMjU2S1NpZ25lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrQ0FBMkM7QUFDM0Msa0NBQWdDO0FBRWhDLHNDQUFrQztBQUNsQyx3REFBK0I7QUFFL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxrQkFBUSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUU5Qzs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILFNBQWdCLFlBQVksQ0FBQyxVQUErQixFQUFFLFdBQVcsR0FBRyxLQUFLO0lBQzdFLE1BQU0sZUFBZSxHQUFlLElBQUEsZUFBUSxFQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3hELElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7S0FDaEg7SUFDRCxNQUFNLE9BQU8sR0FBd0IsU0FBUyxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUU5RSxPQUFPLENBQU8sSUFBeUIsRUFBbUIsRUFBRTtRQUN4RCxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsR0FBMEIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFBLGVBQU0sRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1FBQ2pGLE9BQU8sSUFBQSxhQUFNLEVBQ1Q7WUFDSSxDQUFDLEVBQUUsSUFBQSxjQUFPLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixDQUFDLEVBQUUsSUFBQSxjQUFPLEVBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixhQUFhO1NBQ2hCLEVBQ0QsV0FBVyxDQUNkLENBQUE7SUFDTCxDQUFDLENBQUEsQ0FBQTtBQUNMLENBQUM7QUFsQkQsb0NBa0JDIn0=