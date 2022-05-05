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
exports.EdDSASigner = void 0;
const ed25519_1 = require("@stablelib/ed25519");
const util_1 = require("../util");
/**
 *  Creates a configured signer function for signing data using the EdDSA (Ed25519) algorithm.
 *
 *  The signing function itself takes the data as a `Uint8Array` or `string` and returns a `base64Url`-encoded signature
 *
 *  @example
 *  ```typescript
 *  const sign: Signer = EdDSASigner(process.env.PRIVATE_KEY)
 *  const signature: string = await sign(data)
 *  ```
 *
 *  @param    {String}    secretKey   a 32 or 64 byte secret key as `Uint8Array` or encoded as `base64`, `base58`, or `hex` string
 *  @return   {Function}              a configured signer function `(data: string | Uint8Array): Promise<string>`
 */
function EdDSASigner(secretKey) {
    const privateKeyBytes = (0, util_1.parseKey)(secretKey);
    if (privateKeyBytes.length !== 64 && privateKeyBytes.length !== 32) {
        throw new Error(`bad_key: Invalid private key format. Expecting 64 bytes, but got ${privateKeyBytes.length}`);
    }
    return (data) => __awaiter(this, void 0, void 0, function* () {
        const dataBytes = typeof data === 'string' ? (0, util_1.stringToBytes)(data) : data;
        const sig = (0, ed25519_1.sign)(privateKeyBytes, dataBytes);
        return (0, util_1.bytesToBase64url)(sig);
    });
}
exports.EdDSASigner = EdDSASigner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWREU0FTaWduZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGlkLWp3dC1mb3JrL3NpZ25lcnMvRWREU0FTaWduZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXlDO0FBRXpDLGtDQUFtRTtBQUVuRTs7Ozs7Ozs7Ozs7OztHQWFHO0FBQ0gsU0FBZ0IsV0FBVyxDQUFDLFNBQThCO0lBQ3RELE1BQU0sZUFBZSxHQUFlLElBQUEsZUFBUSxFQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3ZELElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxFQUFFLElBQUksZUFBZSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7UUFDaEUsTUFBTSxJQUFJLEtBQUssQ0FBQyxvRUFBb0UsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7S0FDaEg7SUFDRCxPQUFPLENBQU8sSUFBeUIsRUFBbUIsRUFBRTtRQUN4RCxNQUFNLFNBQVMsR0FBZSxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUEsb0JBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1FBQ25GLE1BQU0sR0FBRyxHQUFlLElBQUEsY0FBSSxFQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQTtRQUN4RCxPQUFPLElBQUEsdUJBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDaEMsQ0FBQyxDQUFBLENBQUE7QUFDTCxDQUFDO0FBVkQsa0NBVUMifQ==