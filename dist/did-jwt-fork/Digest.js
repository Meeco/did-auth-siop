"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concatKDF = exports.toEthereumAddress = exports.keccak = exports.sha256 = void 0;
const sha256_1 = require("@stablelib/sha256");
const u8a = __importStar(require("uint8arrays"));
const js_sha3_1 = require("js-sha3"); // eslint-disable-line
function sha256(payload) {
    const data = typeof payload === 'string' ? u8a.fromString(payload) : payload;
    return (0, sha256_1.hash)(data);
}
exports.sha256 = sha256;
function keccak(data) {
    return new Uint8Array(js_sha3_1.keccak_256.arrayBuffer(data));
}
exports.keccak = keccak;
function toEthereumAddress(hexPublicKey) {
    const hashInput = u8a.fromString(hexPublicKey.slice(2), 'base16');
    return `0x${u8a.toString(keccak(hashInput).slice(-20), 'base16')}`;
}
exports.toEthereumAddress = toEthereumAddress;
function writeUint32BE(value, array = new Uint8Array(4)) {
    const encoded = u8a.fromString(value.toString(), 'base10');
    array.set(encoded, 4 - encoded.length);
    return array;
}
const lengthAndInput = (input) => u8a.concat([writeUint32BE(input.length), input]);
// This implementation of concatKDF was inspired by these two implementations:
// https://github.com/digitalbazaar/minimal-cipher/blob/master/algorithms/ecdhkdf.js
// https://github.com/panva/jose/blob/master/lib/jwa/ecdh/derive.js
function concatKDF(secret, keyLen, alg, producerInfo, consumerInfo) {
    if (keyLen !== 256)
        throw new Error(`Unsupported key length: ${keyLen}`);
    const value = u8a.concat([
        lengthAndInput(u8a.fromString(alg)),
        lengthAndInput(typeof producerInfo === 'undefined' ? new Uint8Array(0) : producerInfo),
        lengthAndInput(typeof consumerInfo === 'undefined' ? new Uint8Array(0) : consumerInfo),
        writeUint32BE(keyLen),
    ]);
    // since our key lenght is 256 we only have to do one round
    const roundNumber = 1;
    return (0, sha256_1.hash)(u8a.concat([writeUint32BE(roundNumber), secret, value]));
}
exports.concatKDF = concatKDF;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlnZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RpZC1qd3QtZm9yay9EaWdlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhDQUF3QztBQUN4QyxpREFBa0M7QUFDbEMscUNBQW9DLENBQUMsc0JBQXNCO0FBRTNELFNBQWdCLE1BQU0sQ0FBQyxPQUE0QjtJQUMvQyxNQUFNLElBQUksR0FBRyxPQUFPLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQTtJQUM1RSxPQUFPLElBQUEsYUFBSSxFQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3JCLENBQUM7QUFIRCx3QkFHQztBQUVELFNBQWdCLE1BQU0sQ0FBQyxJQUFnQjtJQUNuQyxPQUFPLElBQUksVUFBVSxDQUFDLG9CQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDdkQsQ0FBQztBQUZELHdCQUVDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsWUFBb0I7SUFDbEQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQ2pFLE9BQU8sS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFBO0FBQ3RFLENBQUM7QUFIRCw4Q0FHQztBQUVELFNBQVMsYUFBYSxDQUFDLEtBQWEsRUFBRSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQzNELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBQzFELEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDdEMsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztBQUVELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBaUIsRUFBYyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUUxRyw4RUFBOEU7QUFDOUUsb0ZBQW9GO0FBQ3BGLG1FQUFtRTtBQUNuRSxTQUFnQixTQUFTLENBQ3JCLE1BQWtCLEVBQ2xCLE1BQWMsRUFDZCxHQUFXLEVBQ1gsWUFBeUIsRUFDekIsWUFBeUI7SUFFekIsSUFBSSxNQUFNLEtBQUssR0FBRztRQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsMkJBQTJCLE1BQU0sRUFBRSxDQUFDLENBQUE7SUFDeEUsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNyQixjQUFjLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxjQUFjLENBQUMsT0FBTyxZQUFZLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDO1FBQ3RGLGNBQWMsQ0FBQyxPQUFPLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7UUFDdEYsYUFBYSxDQUFDLE1BQU0sQ0FBQztLQUN4QixDQUFDLENBQUE7SUFFRiwyREFBMkQ7SUFDM0QsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFBO0lBQ3JCLE9BQU8sSUFBQSxhQUFJLEVBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3hFLENBQUM7QUFsQkQsOEJBa0JDIn0=