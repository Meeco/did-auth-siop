export declare function bytesToHexString(bytes: Uint8Array): string;
export declare function decodeUriAsJson(uri: string): {};
export declare function encodeJsonAsURI(json: any): any;
export declare function base64ToHexString(input: string): string;
export declare function base64ToBytes(s: string): Uint8Array;
export declare function bytesFromHexString(hexString: string): Uint8Array;
export declare function isHexString(value: string, length?: number): boolean;
export declare function base58ToBase64String(base58: string): string;
export declare function fromBase64(base64: string): string;
export declare function base64urlEncodeBuffer(buf: {
    toString: (arg0: 'base64') => string;
}): string;
