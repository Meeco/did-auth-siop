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
exports.base64urlEncodeBuffer = exports.fromBase64 = exports.base58ToBase64String = exports.isHexString = exports.bytesFromHexString = exports.base64ToBytes = exports.base64ToHexString = exports.encodeJsonAsURI = exports.decodeUriAsJson = exports.bytesToHexString = void 0;
const querystring_1 = require("querystring");
const bs58 = __importStar(require("bs58"));
const u8a = __importStar(require("uint8arrays"));
const types_1 = require("../types");
function bytesToHexString(bytes) {
    return bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');
}
exports.bytesToHexString = bytesToHexString;
function decodeUriAsJson(uri) {
    if (!uri || !uri.includes('openid')) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    const parts = (0, querystring_1.parse)(uri);
    const json = {};
    for (const key in parts) {
        const value = parts[key];
        if (!value) {
            continue;
        }
        const isBool = typeof value == 'boolean';
        const isNumber = typeof value == 'number';
        const isString = typeof value == 'string';
        if (isBool || isNumber) {
            json[decodeURIComponent(key)] = value;
        }
        else if (isString) {
            const decoded = decodeURIComponent(value);
            if (decoded.startsWith('{') && decoded.endsWith('}')) {
                json[decodeURIComponent(key)] = JSON.parse(decoded);
            }
            else {
                json[decodeURIComponent(key)] = decoded;
            }
        }
    }
    return json;
}
exports.decodeUriAsJson = decodeUriAsJson;
function encodeJsonAsURI(json) {
    if (typeof json === 'string') {
        return encodeJsonAsURI(JSON.parse(json));
    }
    const results = [];
    function encodeAndStripWhitespace(key) {
        return encodeURIComponent(key.replace(' ', ''));
    }
    for (const [key, value] of Object.entries(json)) {
        if (!value) {
            continue;
        }
        const isBool = typeof value == 'boolean';
        const isNumber = typeof value == 'number';
        const isString = typeof value == 'string';
        let encoded;
        if (isBool || isNumber) {
            encoded = `${encodeAndStripWhitespace(key)}=${value}`;
        }
        else if (isString) {
            encoded = `${encodeAndStripWhitespace(key)}=${encodeURIComponent(value)}`;
        }
        else {
            encoded = `${encodeAndStripWhitespace(key)}=${encodeURIComponent(JSON.stringify(value))}`;
        }
        results.push(encoded);
    }
    return results.join('&');
}
exports.encodeJsonAsURI = encodeJsonAsURI;
function base64ToHexString(input) {
    return Buffer.from(input, 'base64').toString('hex');
}
exports.base64ToHexString = base64ToHexString;
function base64ToBytes(s) {
    const inputBase64Url = s.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
    return u8a.fromString(inputBase64Url, 'base64url');
}
exports.base64ToBytes = base64ToBytes;
function bytesFromHexString(hexString) {
    const match = hexString.match(/.{1,2}/g);
    if (!match) {
        throw new Error('String does not seem to be in HEX');
    }
    return new Uint8Array(match.map((byte) => parseInt(byte, 16)));
}
exports.bytesFromHexString = bytesFromHexString;
function isHexString(value, length) {
    if (typeof value !== 'string' || !value.match(/^[0-9A-Fa-f]*$/g)) {
        return false;
    }
    else if (length && value.length !== 2 * length) {
        return false;
    }
    return true;
}
exports.isHexString = isHexString;
function base58ToBase64String(base58) {
    return Buffer.from(bs58.decode(base58)).toString('base64');
}
exports.base58ToBase64String = base58ToBase64String;
function fromBase64(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
exports.fromBase64 = fromBase64;
function base64urlEncodeBuffer(buf) {
    return fromBase64(buf.toString('base64'));
}
exports.base64urlEncodeBuffer = base64urlEncodeBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5jb2RpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vZnVuY3Rpb25zL0VuY29kaW5ncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsNkNBQW9DO0FBRXBDLDJDQUE2QjtBQUM3QixpREFBbUM7QUFFbkMsb0NBQXNDO0FBRXRDLFNBQWdCLGdCQUFnQixDQUFDLEtBQWlCO0lBQ2hELE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbkYsQ0FBQztBQUZELDRDQUVDO0FBRUQsU0FBZ0IsZUFBZSxDQUFDLEdBQVc7SUFDekMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3hDO0lBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBQSxtQkFBSyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXpCLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNoQixLQUFLLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRTtRQUN2QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNWLFNBQVM7U0FDVjtRQUNELE1BQU0sTUFBTSxHQUFHLE9BQU8sS0FBSyxJQUFJLFNBQVMsQ0FBQztRQUN6QyxNQUFNLFFBQVEsR0FBRyxPQUFPLEtBQUssSUFBSSxRQUFRLENBQUM7UUFDMUMsTUFBTSxRQUFRLEdBQUcsT0FBTyxLQUFLLElBQUksUUFB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