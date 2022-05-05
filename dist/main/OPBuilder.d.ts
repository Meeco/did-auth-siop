import { Resolvable } from 'did-resolver';
import { OP } from './OP';
import { EcdsaSignature } from './types/JWT.types';
import { CredentialFormat, ExternalSignature, InternalSignature, PassBy, ResponseMode, ResponseRegistrationOpts, SuppliedSignature } from './types/SIOP.types';
export default class OPBuilder {
    didMethods: string[];
    resolvers: Map<string, Resolvable>;
    signatureType: InternalSignature | ExternalSignature | SuppliedSignature;
    credentialFormats: CredentialFormat[];
    responseRegistration: ResponseRegistrationOpts;
    responseMode?: ResponseMode;
    expiresIn?: number;
    resolver?: Resolvable;
    addCredentialFormat(credentialFormat: CredentialFormat): OPBuilder;
    defaultResolver(resolver: Resolvable): OPBuilder;
    addResolver(didMethod: string, resolver: Resolvable): OPBuilder;
    addDidMethod(didMethod: string, opts?: {
        resolveUrl?: string;
        baseUrl?: string;
    }): OPBuilder;
    withExpiresIn(expiresIn: number): OPBuilder;
    response(responseMode: ResponseMode): OPBuilder;
    registrationBy(registrationBy: PassBy, refUri?: string): OPBuilder;
    signature(signatureType: InternalSignature | SuppliedSignature): OPBuilder;
    internalSignature(hexPrivateKey: string, did: string, kid: string): OPBuilder;
    suppliedSignature(signature: (data: string | Uint8Array) => Promise<EcdsaSignature | string>, did: string, kid: string): OPBuilder;
    build(): OP;
}
