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
exports.leftpad = exports.parseKey = exports.toSealed = exports.fromJose = exports.toJose = exports.stringToBytes = exports.bytesToHex = exports.decodeBase64url = exports.encodeBase64url = exports.hexToBytes = exports.bytesToBase58 = exports.base58ToBytes = exports.bytesToBase64 = exports.base64ToBytes = exports.bytesToBase64url = void 0;
const u8a = __importStar(require("uint8arrays"));
function bytesToBase64url(b) {
    return u8a.toString(b, 'base64url');
}
exports.bytesToBase64url = bytesToBase64url;
function base64ToBytes(s) {
    const inputBase64Url = s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return u8a.fromString(inputBase64Url, 'base64url');
}
exports.base64ToBytes = base64ToBytes;
function bytesToBase64(b) {
    return u8a.toString(b, 'base64pad');
}
exports.bytesToBase64 = bytesToBase64;
function base58ToBytes(s) {
    return u8a.fromString(s, 'base58btc');
}
exports.base58ToBytes = base58ToBytes;
function bytesToBase58(b) {
    return u8a.toString(b, 'base58btc');
}
exports.bytesToBase58 = bytesToBase58;
function hexToBytes(s) {
    const input = s.startsWith('0x') ? s.substring(2) : s;
    return u8a.fromString(input.toLowerCase(), 'base16');
}
exports.hexToBytes = hexToBytes;
function encodeBase64url(s) {
    return bytesToBase64url(u8a.fromString(s));
}
exports.encodeBase64url = encodeBase64url;
function decodeBase64url(s) {
    return u8a.toString(base64ToBytes(s));
}
exports.decodeBase64url = decodeBase64url;
function bytesToHex(b) {
    return u8a.toString(b, 'base16');
}
exports.bytesToHex = bytesToHex;
function stringToBytes(s) {
    return u8a.fromString(s);
}
exports.stringToBytes = stringToBytes;
function toJose({ r, s, recoveryParam }, recoverable) {
    const jose = new Uint8Array(recoverable ? 65 : 64);
    jose.set(u8a.fromString(r, 'base16'), 0);
    jose.set(u8a.fromString(s, 'base16'), 32);
    if (recoverable) {
        if (typeof recoveryParam === 'undefined') {
            throw new Error('Signer did not return a recoveryParam');
        }
        jose[64] = recoveryParam;
    }
    return bytesToBase64url(jose);
}
exports.toJose = toJose;
function fromJose(signature) {
    const signatureBytes = base64ToBytes(signature);
    if (signatureBytes.length < 64 || signatureBytes.length > 65) {
        throw new TypeError(`Wrong size for signature. Expected 64 or 65 bytes, but got ${signatureBytes.length}`);
    }
    const r = bytesToHex(signatureBytes.slice(0, 32));
    const s = bytesToHex(signatureBytes.slice(32, 64));
    const recoveryParam = signatureBytes.length === 65 ? signatureBytes[64] : undefined;
    return { r, s, recoveryParam };
}
exports.fromJose = fromJose;
function toSealed(ciphertext, tag) {
    return u8a.concat([base64ToBytes(ciphertext), base64ToBytes(tag)]);
}
exports.toSealed = toSealed;
const hexMatcher = /^(0x)?([a-fA-F0-9]{64}|[a-fA-F0-9]{128})$/;
const base58Matcher = /^([1-9A-HJ-NP-Za-km-z]{44}|[1-9A-HJ-NP-Za-km-z]{88})$/;
const base64Matcher = /^([0-9a-zA-Z=\-_+/]{43}|[0-9a-zA-Z=\-_+/]{86})(={0,2})$/;
/**
 * Parses a private key and returns the Uint8Array representation.
 * This method uses an heuristic to determine the key encoding to then be able to parse it into 32 or 64 bytes.
 *
 * @param input a 32 or 64 byte key presented either as a Uint8Array or as a hex, base64, or base58btc encoded string
 *
 * @throws TypeError('Invalid private key format') if the key doesn't match any of the accepted formats or length
 */
function parseKey(input) {
    if (typeof input === 'string') {
        if (hexMatcher.test(input)) {
            return hexToBytes(input);
        }
        else if (base58Matcher.test(input)) {
            return base58ToBytes(input);
        }
        else if (base64Matcher.test(input)) {
            return base64ToBytes(input);
        }
        else {
            throw TypeError('bad_key: Invalid private key format');
        }
    }
    else if (input instanceof Uint8Array) {
        return input;
    }
    else {
        throw TypeError('bad_key: Invalid private key format');
    }
}
exports.parseKey = parseKey;
function leftpad(data, size = 64) {
    if (data.length === size)
        return data;
    return '0'.repeat(size - data.length) + data;
}
exports.leftpad = leftpad;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWQtand0LWZvcmsvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQWtDO0FBV2xDLFNBQWdCLGdCQUFnQixDQUFDLENBQWE7SUFDMUMsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixhQUFhLENBQUMsQ0FBUztJQUNuQyxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDbEYsT0FBTyxHQUFHLENBQUMsVUFBVSxDQUFDLGNBQWMsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUN0RCxDQUFDO0FBSEQsc0NBR0M7QUFFRCxTQUFnQixhQUFhLENBQUMsQ0FBYTtJQUN2QyxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFBO0FBQ3ZDLENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxDQUFTO0lBQ25DLE9BQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUE7QUFDekMsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLENBQWE7SUFDdkMsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxTQUFnQixVQUFVLENBQUMsQ0FBUztJQUNoQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxD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