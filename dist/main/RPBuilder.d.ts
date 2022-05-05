import { Resolvable } from 'did-resolver';
import { RP } from './RP';
import { EcdsaSignature } from './types/JWT.types';
import { ClaimOpts, CredentialFormat, ExternalSignature, InternalSignature, NoSignature, ObjectBy, PassBy, PresentationDefinitionWithLocation, RequestRegistrationOpts, ResponseContext, ResponseMode, SubjectIdentifierType, SuppliedSignature } from './types/SIOP.types';
export default class RPBuilder {
    subjectIdentifierTypes: SubjectIdentifierType;
    didMethods: string[];
    resolvers: Map<string, Resolvable>;
    resolver?: Resolvable;
    credentialFormats: CredentialFormat[];
    requestRegistration: Partial<RequestRegistrationOpts>;
    redirectUri: string;
    requestObjectBy: ObjectBy;
    signatureType: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature;
    responseMode?: ResponseMode;
    responseContext?: ResponseContext.RP;
    claims?: ClaimOpts;
    addCredentialFormat(credentialType: CredentialFormat): RPBuilder;
    defaultResolver(resolver: Resolvable): RPBuilder;
    addResolver(didMethod: string, resolver: Resolvable): RPBuilder;
    addDidMethod(didMethod: string, opts?: {
        resolveUrl?: string;
        baseUrl?: string;
    }): RPBuilder;
    redirect(redirectUri: string): RPBuilder;
    requestBy(type: PassBy, referenceUri?: string): RPBuilder;
    response(responseMode: ResponseMode): RPBuilder;
    registrationBy(registrationBy: PassBy, refUri?: string): RPBuilder;
    signature(signatureType: InternalSignature | SuppliedSignature): RPBuilder;
    internalSignature(hexPrivateKey: string, did: string, kid?: string): RPBuilder;
    suppliedSignature(signature: (data: string | Uint8Array) => Promise<EcdsaSignature | string>, did: string, kid: string): RPBuilder;
    addPresentationDefinitionClaim(definitionOpt: PresentationDefinitionWithLocation): RPBuilder;
    build(): RP;
}
