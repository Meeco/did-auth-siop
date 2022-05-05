import { JWK } from 'jose/types';
export declare function isEd25519DidKeyMethod(did?: string): boolean;
export declare function isEd25519JWK(jwk: JWK): boolean;
export declare function getBase58PrivateKeyFromHexPrivateKey(hexPrivateKey: string): string;
export declare function getPublicED25519JWKFromHexPrivateKey(hexPrivateKey: string, kid?: string): JWK;
export declare function getPublicJWKFromHexPrivateKey(hexPrivateKey: string, kid?: string, did?: string): JWK;
export declare function getThumbprintFromJwk(jwk: JWK, did: string): string;
export declare function getThumbprint(hexPrivateKey: string, did: string): string;
