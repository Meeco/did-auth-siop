"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const OP_1 = require("./OP");
const functions_1 = require("./functions");
class OPBuilder {
    constructor() {
        this.didMethods = [];
        this.resolvers = new Map();
        this.credentialFormats = [];
    }
    addCredentialFormat(credentialFormat) {
        this.credentialFormats.push(credentialFormat);
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
    /*withDid(did: string): OPBuilder {
      this.did = did;
      return this;
    }
  */
    withExpiresIn(expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
    response(responseMode) {
        this.responseMode = responseMode;
        return this;
    }
    registrationBy(registrationBy, refUri) {
        this.responseRegistration = {
            registrationBy: {
                type: registrationBy,
            },
        };
        if (refUri) {
            this.responseRegistration.registrationBy.referenceUri = refUri;
        }
        return this;
    }
    /*//TODO registration object creation
    authorizationEndpoint?: Schema.OPENID | string;
    scopesSupported?: Scope[] | Scope;
    subjectTypesSupported?: SubjectType[] | SubjectType;
    idTokenSigningAlgValuesSupported?: KeyAlgo[] | KeyAlgo;
    requestObjectSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
  */
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
    build() {
        // this.responseRegistration.didMethodsSupported = this.didMethods;
        // this.responseRegistration.subjectIdentifiersSupported = this.subjectIdentifierTypes;
        // this.responseRegistration.credentialFormatsSupported = this.credentialFormats;
        return new OP_1.OP({ builder: this });
    }
}
exports.default = OPBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1BCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21haW4vT1BCdWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkRBQTBEO0FBQzFELCtDQUFvRDtBQUVwRCw2QkFBMEI7QUFDMUIsMkNBQXFDO0FBWXJDLE1BQXFCLFNBQVM7SUFBOUI7UUFDRSxlQUFVLEdBQWEsRUFBRSxDQUFDO1FBQzFCLGNBQVMsR0FBNEIsSUFBSSxHQUFHLEVBQXNCLENBQUM7UUFFbkUsc0JBQWlCLEdBQXVCLEVBQUUsQ0FBQztJQXFGN0MsQ0FBQztJQTdFQyxtQkFBbUIsQ0FBQyxnQkFBa0M7UUFDcEQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGVBQWUsQ0FBQyxRQUFvQjtRQUNsQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxXQUFXLENBQUMsU0FBaUIsRUFBRSxRQUFvQjtRQUNqRCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxrQkFBTSxDQUFDLDJCQUEyQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRSxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxZQUFZLENBQUMsU0FBaUIsRUFBRSxJQUFnRDtRQUM5RSxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLHVCQUFRLENBQUMsSUFBQSwrQkFBYyxFQUFDLGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLG9CQUFPLElBQUksRUFBRyxDQUFDLENBQUMsQ0FBQztRQUMzRyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7OztJQUlBO0lBQ0EsYUFBYSxDQUFDLFNBQWlCO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELFFBQVEsQ0FBQyxZQUEwQjtRQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxjQUFjLENBQUMsY0FBc0IsRUFBRSxNQUFlO1FBQ3BELElBQUksQ0FBQyxvQkFBb0IsR0FBRztZQUMxQixjQUFjLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLGNBQWM7YUFDckI7U0FDRixDQUFDO1FBQ0YsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7U0FDaEU7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRDs7Ozs7O0lBTUE7SUFDQSw2Q0FBNkM7SUFDN0MsU0FBUyxDQUFDLGFBQW9EO1FBQzVELElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGlCQUFpQixDQUFDLGFBQXFCLEVBQUUsR0FBVyxFQUFFLEdBQVc7UUFDL0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM1QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxTQUEwRSxFQUFFLEdBQVcsRUFBRSxHQUFXO1FBQ3BILElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDeEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSztRQUNILG1FQUFtRTtRQUNuRSx1RkFBdUY7UUFDdkYsaUZBQWlGO1FBQ2pGLE9BQU8sSUFBSSxPQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNuQyxDQUFDO0NBQ0Y7QUF6RkQsNEJBeUZDIn0=