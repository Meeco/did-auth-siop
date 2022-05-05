import type { DIDResolutionResult, VerificationMethod } from 'did-resolver';
export interface EcdsaSignature {
    r: string;
    s: string;
    recoveryParam?: number | null;
}
export declare type Signer = (data: string | Uint8Array) => Promise<EcdsaSignature | string>;
export interface JWTPayload {
    iss?: string;
    sub?: string;
    aud?: string | string[];
    iat?: number;
    nbf?: number;
    type?: string;
    exp?: number;
    rexp?: number;
    jti?: string;
    [x: string]: any;
}
export interface VerifiedJWT {
    payload: Partial<JWTPayload>;
    didResolutionResult: DIDResolutionResult;
    issuer: string;
    signer: VerificationMethod;
    jwt: string;
}
export declare type ECCurve = 'P-256' | 'secp256k1' | 'P-384' | 'P-521';
