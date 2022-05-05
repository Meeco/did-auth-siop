"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createState = exports.getState = exports.toNonce = exports.getNonce = void 0;
const ethers_1 = require("ethers");
const sha_js_1 = __importDefault(require("sha.js"));
const Encodings_1 = require("./Encodings");
function getNonce(state, nonce) {
    return nonce || toNonce(state);
}
exports.getNonce = getNonce;
function toNonce(input) {
    const buff = (0, sha_js_1.default)('sha256').update(input).digest();
    return (0, Encodings_1.base64urlEncodeBuffer)(buff);
}
exports.toNonce = toNonce;
function getState(state) {
    return state || createState();
}
exports.getState = getState;
function createState() {
    const randomNumber = ethers_1.ethers.BigNumber.from(ethers_1.utils.randomBytes(12));
    return ethers_1.utils.hexlify(randomNumber).replace('0x', '');
}
exports.createState = createState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9mdW5jdGlvbnMvU3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUNBQXNEO0FBQ3RELG9EQUF5QjtBQUV6QiwyQ0FBb0Q7QUFFcEQsU0FBZ0IsUUFBUSxDQUFDLEtBQWEsRUFBRSxLQUFjO0lBQ3BELE9BQU8sS0FBSyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNqQyxDQUFDO0FBRkQsNEJBRUM7QUFFRCxTQUFnQixPQUFPLENBQUMsS0FBYTtJQUNuQyxNQUFNLElBQUksR0FBRyxJQUFBLGdCQUFHLEVBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xELE9BQU8sSUFBQSxpQ0FBcUIsRUFBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBSEQsMEJBR0M7QUFFRCxTQUFnQixRQUFRLENBQUMsS0FBYztJQUNyQyxPQUFPLEtBQUssSUFBSSxXQUFXLEVBQUUsQ0FBQztBQUNoQyxDQUFDO0FBRkQsNEJBRUM7QUFFRCxTQUFnQixXQUFXO0lBQ3pCLE1BQU0sWUFBWSxHQUFHLGVBQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4RSxPQUFPLGNBQVcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBSEQsa0NBR0MifQ==