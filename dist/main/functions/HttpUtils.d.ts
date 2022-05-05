import { JWTPayload } from '../types/JWT.types';
import { AuthenticationResponseWithJWT } from '../types/SIOP.types';
export declare function postWithBearerToken(url: string, body: JWTPayload, bearerToken: string): Promise<Response>;
export declare function postAuthenticationResponse(url: string, body: AuthenticationResponseWithJWT): Promise<Response>;
export declare function postAuthenticationResponseJwt(url: string, jwt: string): Promise<Response>;
