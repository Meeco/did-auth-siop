import { SIOP } from './types';
import { RequestRegistrationPayload } from './types/SIOP.types';
export declare function assertValidRequestRegistrationOpts(opts: SIOP.RequestRegistrationOpts): void;
export declare function createRequestRegistrationPayload(opts: SIOP.RequestRegistrationOpts): RequestRegistrationPayload;
export declare function createRequestRegistration(opts: SIOP.RequestRegistrationOpts): {
    requestRegistrationPayload: RequestRegistrationPayload;
    rpRegistrationMetadataPayload: SIOP.RPRegistrationMetadataPayload;
    opts: SIOP.RequestRegistrationOpts;
};
