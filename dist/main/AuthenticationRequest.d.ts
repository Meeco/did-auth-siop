import { SIOP } from './types';
import { AuthenticationRequestPayload } from './types/SIOP.types';
export default class AuthenticationRequest {
    /**
     * Create a signed URL encoded URI with a signed SIOP request token on RP side
     *
     * @param opts Request input data to build a  SIOP Request Token
     * @remarks This method is used to generate a SIOP request with info provided by the RP.
     * First it generates the request payload and then it creates the signed JWT, which is returned as a URI
     *
     * Normally you will want to use this method to create the request.
     */
    static createURI(opts: SIOP.AuthenticationRequestOpts): Promise<SIOP.AuthenticationRequestURI>;
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param uri
     */
    static parseURI(uri: string): AuthenticationRequestPayload;
    /**
     * Create a signed SIOP request as JWT on RP side, typically you will want to use the createURI version!
     *
     * @param opts Request input data to build a SIOP Request as JWT
     * @remarks This method is used to generate a SIOP request with info provided by the RP.
     * First it generates the request payload and then it creates the signed JWT.
     *
     * Normally you will want to use the createURI version. That creates a URI that includes the JWT from this method in the URI
     * If you do use this method, you can call the wrapInUri afterwards to get the URI
     */
    static createJWT(opts: SIOP.AuthenticationRequestOpts): Promise<SIOP.AuthenticationRequestWithJWT>;
    static wrapAsURI(request: SIOP.AuthenticationRequestWithJWT): SIOP.AuthenticationRequestURI;
    /**
     * Verifies a SIOP Request JWT on OP side
     *
     * @param jwt
     * @param opts
     */
    static verifyJWT(jwt: string, opts: SIOP.VerifyAuthenticationRequestOpts): Promise<SIOP.VerifiedAuthenticationRequestWithJWT>;
}
