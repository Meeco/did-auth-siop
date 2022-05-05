"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscoveryMetadataPayload = void 0;
const types_1 = require("./types");
const SIOP_types_1 = require("./types/SIOP.types");
function createDiscoveryMetadataPayload(opts) {
    return {
        issuer: SIOP_types_1.ResponseIss.SELF_ISSUED_V2,
        response_types_supported: SIOP_types_1.ResponseType.ID_TOKEN,
        authorization_endpoint: (opts === null || opts === void 0 ? void 0 : opts.authorizationEndpoint) || SIOP_types_1.Schema.OPENID,
        scopes_supported: (opts === null || opts === void 0 ? void 0 : opts.scopesSupported) || SIOP_types_1.Scope.OPENID,
        id_token_signing_alg_values_supported: (opts === null || opts === void 0 ? void 0 : opts.idTokenSigningAlgValuesSupported) || [types_1.SIOP.KeyAlgo.ES256K, types_1.SIOP.KeyAlgo.EDDSA],
        request_object_signing_alg_values_supported: (opts === null || opts === void 0 ? void 0 : opts.requestObjectSigningAlgValuesSupported) || [types_1.SIOP.SigningAlgo.ES256K, types_1.SIOP.SigningAlgo.EDDSA],
        subject_types_supported: (opts === null || opts === void 0 ? void 0 : opts.subjectTypesSupported) || SIOP_types_1.SubjectType.PAIRWISE,
        credential_formats_supported: opts.credentialFormatsSupported,
        did_methods_supported: opts.didMethodsSupported,
        credential_claims_supported: opts.credentialClaimsSupported,
        credential_endpoint: opts.credentialEndpoint,
        credential_name: opts.credentialName,
        credential_supported: opts.credentialSupported,
        dids_supported: opts.didsSupported,
    };
}
exports.createDiscoveryMetadataPayload = createDiscoveryMetadataPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXNwb25zZVJlZ2lzdHJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tYWluL0F1dGhlbnRpY2F0aW9uUmVzcG9uc2VSZWdpc3RyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQStCO0FBQy9CLG1EQUEyRjtBQUUzRixTQUFnQiw4QkFBOEIsQ0FBQyxJQUFnQztJQUM3RSxPQUFPO1FBQ0wsTUFBTSxFQUFFLHdCQUFXLENBQUMsY0FBYztRQUNsQyx3QkFBd0IsRUFBRSx5QkFBWSxDQUFDLFFBQVE7UUFDL0Msc0JBQXNCLEVBQUUsQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUscUJBQXFCLEtBQUksbUJBQU0sQ0FBQyxNQUFNO1FBQ3BFLGdCQUFnQixFQUFFLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGVBQWUsS0FBSSxrQkFBSyxDQUFDLE1BQU07UUFDdkQscUNBQXFDLEVBQUUsQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZ0NBQWdDLEtBQUksQ0FBQyxZQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxZQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUMxSCwyQ0FBMkMsRUFBRSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxzQ0FBc0MsS0FBSSxDQUFDLFlBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLFlBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQzlJLHVCQUF1QixFQUFFLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLHFCQUFxQixLQUFJLHdCQUFXLENBQUMsUUFBUTtRQUM1RSw0QkFBNEIsRUFBRSxJQUFJLENBQUMsMEJBQTBCO1FBQzdELHFCQUFxQixFQUFFLElBQUksQ0FBQyxtQkFBbUI7UUFDL0MsMkJBQTJCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QjtRQUMzRCxtQkFBbUIsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1FBQzVDLGVBQWUsRUFBRSxJQUFJLENBQUMsY0FBYztRQUNwQyxvQkFBb0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1FBQzlDLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYTtLQUNuQyxDQUFDO0FBQ0osQ0FBQztBQWpCRCx3RUFpQkMifQ==