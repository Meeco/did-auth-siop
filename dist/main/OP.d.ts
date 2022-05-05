import OPBuilder from './OPBuilder';
import { SIOP } from './types';
import { AuthenticationResponseOpts, AuthenticationResponseWithJWT, ExternalVerification, InternalVerification, ParsedAuthenticationRequestURI, VerifiablePresentationResponseOpts, VerifiedAuthenticationRequestWithJWT, VerifyAuthenticationRequestOpts } from './types/SIOP.types';
export declare class OP {
    private readonly _authResponseOpts;
    private readonly _verifyAuthRequestOpts;
    constructor(opts: {
        builder?: OPBuilder;
        responseOpts?: AuthenticationResponseOpts;
        verifyOpts?: VerifyAuthenticationRequestOpts;
    });
    get authResponseOpts(): AuthenticationResponseOpts;
    get verifyAuthRequestOpts(): Partial<VerifyAuthenticationRequestOpts>;
    postAuthenticationResponse(authenticationResponse: AuthenticationResponseWithJWT): Promise<Response>;
    verifyAuthenticationRequest(requestJwtorUri: string, opts?: {
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
    }): Promise<VerifiedAuthenticationRequestWithJWT>;
    createAuthenticationResponse(verifiedJwt: SIOP.VerifiedAuthenticationRequestWithJWT, responseOpts?: {
        nonce?: string;
        state?: string;
        audience?: string;
        verification?: InternalVerification | ExternalVerification;
        vp?: VerifiablePresentationResponseOpts[];
    }): Promise<AuthenticationResponseWithJWT>;
    submitAuthenticationResponse(verifiedJwt: SIOP.AuthenticationResponseWithJWT): Promise<Response>;
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param encodedUri
     */
    parseAuthenticationRequestURI(encodedUri: string): Promise<ParsedAuthenticationRequestURI>;
    newAuthenticationResponseOpts(opts?: {
        nonce?: string;
        state?: string;
        audience?: string;
        vp?: VerifiablePresentationResponseOpts[];
    }): AuthenticationResponseOpts;
    newVerifyAuthenticationRequestOpts(opts?: {
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
    }): VerifyAuthenticationRequestOpts;
    static fromOpts(responseOpts: AuthenticationResponseOpts, verifyOpts: VerifyAuthenticationRequestOpts): OP;
    static builder(): OPBuilder;
}
