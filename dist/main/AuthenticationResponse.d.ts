import { SIOP } from './types';
import { VerifiedAuthenticationResponseWithJWT, VerifyAuthenticationResponseOpts } from './types/SIOP.types';
export default class AuthenticationResponse {
    /**
     * Creates a SIOP Response Object
     *
     * @param requestJwt
     * @param responseOpts
     * @param verifyOpts
     */
    static createJWTFromRequestJWT(requestJwt: string, responseOpts: SIOP.AuthenticationResponseOpts, verifyOpts: SIOP.VerifyAuthenticationRequestOpts): Promise<SIOP.AuthenticationResponseWithJWT>;
    static createJWTFromVerifiedRequest(verifiedJwt: SIOP.VerifiedAuthenticationRequestWithJWT, responseOpts: SIOP.AuthenticationResponseOpts): Promise<SIOP.AuthenticationResponseWithJWT>;
    /**
     * Verifies a SIOP ID Response JWT on the RP Side
     *
     * @param jwt ID token to be validated
     * @param verifyOpts
     */
    static verifyJWT(jwt: string, verifyOpts: VerifyAuthenticationResponseOpts): Promise<VerifiedAuthenticationResponseWithJWT>;
}
