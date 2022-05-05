"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const RP_1 = require("./RP");
const functions_1 = require("./functions");
const SIOP_types_1 = require("./types/SIOP.types");
class RPBuilder {
    constructor() {
        this.subjectIdentifierTypes = SIOP_types_1.SubjectIdentifierType.DID;
        this.didMethods = [];
        this.resolvers = new Map();
        this.credentialFormats = [];
        this.requestRegistration = {};
    }
    // claims?: ClaimPayload;
    addCredentialFormat(credentialType) {
        this.credentialFormats.push(credentialType);
        return this;
    }
    defaultResolver(resolver) {
        this.resolver = resolver;
        return this;
    }
    addResolver(didMethod, resolver) {
        this.didMethods.push(functions_1.DIDJwt.toSIOPRegistrationDidMethod(didMethod));
        this.resolvers.set(functions_1.DIDJwt.getMethodFromDid(didMethod), resolver);
        return this;
    }
    addDidMethod(didMethod, opts) {
        this.addResolver(didMethod, new did_resolver_1.Resolver((0, did_uni_client_1.getUniResolver)(functions_1.DIDJwt.getMethodFromDid(didMethod), Object.assign({}, opts))));
        return this;
    }
    redirect(redirectUri) {
        this.redirectUri = redirectUri;
        return this;
    }
    requestBy(type, referenceUri) {
        this.requestObjectBy = {
            type,
            referenceUri,
        };
        return this;
    }
    response(responseMode) {
        this.responseMode = responseMode;
        return this;
    }
    registrationBy(registrationBy, refUri) {
        this.requestRegistration = {
            registrationBy: {
                type: registrationBy,
                referenceUri: refUri,
            },
        };
        /*if (refUri) {
              this.requestRegistration.registrationBy.referenceUri = refUri;
            }*/
        return this;
    }
    // Only internal | supplied supported for now
    signature(signatureType) {
        this.signatureType = signatureType;
        return this;
    }
    internalSignature(hexPrivateKey, did, kid) {
        this.signature({ hexPrivateKey, did, kid });
        return this;
    }
    suppliedSignature(signature, did, kid) {
        this.signature({ signature, did, kid });
        return this;
    }
    addPresentationDefinitionClaim(definitionOpt) {
        if (!this.claims || !this.claims.presentationDefinitions) {
            this.claims = {
                presentationDefinitions: [definitionOpt],
            };
        }
        else {
            this.claims.presentationDefinitions.push(definitionOpt);
        }
        return this;
    }
    build() {
        this.requestRegistration.didMethodsSupported = this.didMethods;
        this.requestRegistration.subjectIdentifiersSupported = this.subjectIdentifierTypes;
        this.requestRegistration.credentialFormatsSupported = this.credentialFormats;
        return new RP_1.RP({ builder: this });
    }
}
exports.default = RPBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUlBCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vUlBCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTBEO0FBQzFELCtDQUFvRDtBQUVwRCw2QkFBMEI7QUFDMUIsMkNBQXFDO0FBRXJDLG1EQWM0QjtBQUU1QixNQUFxQixTQUFTO0lBQTlCO1FBQ0UsMkJBQXNCLEdBQTBCLGtDQUFxQixDQUFDLEdBQUcsQ0FBQztRQUMxRSxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLGNBQVMsR0FBNEIsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFFbkUsc0JBQWlCLEdBQXVCLEVBQUUsQ0FBQztRQUMzQyx3QkFBbUIsR0FBcUMsRUFBRSxDQUFDO0lBK0Y3RCxDQUFDO0lBdkZDLHlCQUF5QjtJQUV6QixtQkFBbUIsQ0FBQyxjQUFnQztRQUNsRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGVBQWUsQ0FBQyxRQUFvQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXLENBQUMsU0FBaUIsRUFBRSxRQUFvQjtRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBTSxDQUFDLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBaUIsRUFBRSxJQUFnRDtRQUM5RSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLHVCQUFRLENB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