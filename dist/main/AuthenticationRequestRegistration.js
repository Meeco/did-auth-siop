"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequestRegistration = exports.createRequestRegistrationPayload = exports.assertValidRequestRegistrationOpts = void 0;
const types_1 = require("./types");
const SIOP_types_1 = require("./types/SIOP.types");
function assertValidRequestRegistrationOpts(opts) {
    if (!opts) {
        throw new Error(types_1.SIOPErrors.REGISTRATION_NOT_SET);
    }
    else if (opts.registrationBy.type !== types_1.SIOP.PassBy.REFERENCE && opts.registrationBy.type !== types_1.SIOP.PassBy.VALUE) {
        throw new Error(types_1.SIOPErrors.REGISTRATION_OBJECT_TYPE_NOT_SET);
    }
    else if (opts.registrationBy.type === types_1.SIOP.PassBy.REFERENCE && !opts.registrationBy.referenceUri) {
        throw new Error(types_1.SIOPErrors.NO_REFERENCE_URI);
    }
}
exports.assertValidRequestRegistrationOpts = assertValidRequestRegistrationOpts;
function createRequestRegistrationPayload(opts) {
    assertValidRequestRegistrationOpts(opts);
    if (opts.registrationBy.type == SIOP_types_1.PassBy.VALUE) {
        return { registration: createRPRegistrationMetadataPayload(opts) };
    }
    else {
        return { registration_uri: opts.registrationBy.referenceUri };
    }
}
exports.createRequestRegistrationPayload = createRequestRegistrationPayload;
function createRequestRegistration(opts) {
    return {
        requestRegistrationPayload: createRequestRegistrationPayload(opts),
        rpRegistrationMetadataPayload: createRPRegistrationMetadataPayload(opts),
        opts,
    };
}
exports.createRequestRegistration = createRequestRegistration;
function createRPRegistrationMetadataPayload(opts) {
    return {
        did_methods_supported: opts.didMethodsSupported || ['did:eosio:', 'did:ethr:', 'did:factom:', 'did:lto:'],
        subject_identifiers_supported: opts.subjectIdentifiersSupported || types_1.SIOP.SubjectIdentifierType.DID,
        credential_formats_supported: opts.credentialFormatsSupported || [],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXF1ZXN0UmVnaXN0cmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vQXV0aGVudGljYXRpb25SZXF1ZXN0UmVnaXN0cmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUEyQztBQUMzQyxtREFBd0U7QUFFeEUsU0FBZ0Isa0NBQWtDLENBQUMsSUFBa0M7SUFDbkYsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ2xEO1NBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksS0FBSyxZQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksS0FBSyxZQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtRQUMvRyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUM5RDtTQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEtBQUssWUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRTtRQUNsRyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUM5QztBQUNILENBQUM7QUFSRCxnRkFRQztBQUVELFNBQWdCLGdDQUFnQyxDQUFDLElBQWtDO0lBQ2pGLGtDQUFrQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksbUJBQU0sQ0FBQyxLQUFLLEVBQUU7UUFDNUMsT0FBTyxFQUFFLFlBQVksRUFBRSxtQ0FBbUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ3BFO1NBQU07UUFDTCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztLQUMvRDtBQUNILENBQUM7QUFQRCw0RUFPQztBQUVELFNBQWdCLHlCQUF5QixDQUFDLElBQWtDO0lBSzFFLE9BQU87UUFDTCwwQkFBMEIsRUFBRSxnQ0FBZ0MsQ0FBQyxJQUFJLENBQUM7UUFDbEUsNkJBQTZCLEVBQUUsbUNBQW1DLENBQUMsSUFBSSxDQUFDO1FBQ3hFLElBQUk7S0FDTCxDQUFDO0FBQ0osQ0FBQztBQVZELDhEQVVDO0FBRUQsU0FBUyxtQ0FBbUMsQ0FBQyxJQUFxQztJQUNoRixPQUFPO1FBQ0wscUJBQXFCLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDO1FBQ3pHLDZCQUE2QixFQUFFLElBQUksQ0FBQywyQkFBMkIsSUFBSSxZQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRztRQUNqRyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCLElBQUksRUFBRTtLQUNwRSxDQUFDO0FBQ0osQ0FBQyJ9