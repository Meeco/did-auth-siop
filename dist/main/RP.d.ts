import RPBuilder from './RPBuilder';
import { SIOP } from './types';
import { AuthenticationRequestOpts, AuthenticationRequestURI, ClaimOpts, ExternalVerification, InternalVerification, VerifiedAuthenticationResponseWithJWT, VerifyAuthenticationResponseOpts } from './types/SIOP.types';
export declare class RP {
    private readonly _authRequestOpts;
    private readonly _verifyAuthResponseOpts;
    constructor(opts: {
        builder?: RPBuilder;
        requestOpts?: AuthenticationRequestOpts;
        verifyOpts?: VerifyAuthenticationResponseOpts;
    });
    get authRequestOpts(): AuthenticationRequestOpts;
    get verifyAuthResponseOpts(): Partial<VerifyAuthenticationResponseOpts>;
    createAuthenticationRequest(opts?: {
        nonce?: string;
        state?: string;
    }): Promise<AuthenticationRequestURI>;
    verifyAuthenticationResponseJwt(jwt: string, opts?: {
        audience: string;
        state?: string;
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
        claims?: ClaimOpts;
    }): Promise<VerifiedAuthenticationResponseWithJWT>;
    newAuthenticationRequestOpts(opts?: {
        nonce?: string;
        state?: string;
    }): AuthenticationRequestOpts;
    newVerifyAuthenticationResponseOpts(opts?: {
        state?: string;
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
        claims?: ClaimOpts;
        audience: string;
    }): VerifyAuthenticationResponseOpts;
    static fromRequestOpts(opts: SIOP.AuthenticationRequestOpts): RP;
    static builder(): RPBuilder;
}
