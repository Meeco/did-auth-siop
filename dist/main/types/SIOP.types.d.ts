import { IPresentation as PEPresentation, IVerifiablePresentation as PEVerifiablePresentation } from '@sphereon/pex';
import { PresentationDefinitionV1, PresentationDefinitionV2 } from '@sphereon/pex-models';
import { DIDDocument as DIFDIDDocument, VerificationMethod } from 'did-resolver';
import { JWK } from 'jose/types';
import { EcdsaSignature, JWTPayload, VerifiedJWT } from './JWT.types';
import { LinkedDataProof, ResolveOpts } from './SSI.types';
export declare const expirationTime: number;
export interface AuthenticationRequestOpts {
    redirectUri: string;
    requestBy: ObjectBy;
    signatureType: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature;
    responseMode?: ResponseMode;
    responseContext?: ResponseContext;
    claims?: ClaimOpts;
    registration: RequestRegistrationOpts;
    nonce?: string;
    state?: string;
}
export interface AuthenticationRequestPayload extends JWTPayload, RequestRegistrationPayload {
    scope: string;
    response_type: ResponseType;
    client_id: string;
    redirect_uri: string;
    id_token_hint?: string;
    response_mode: ResponseMode;
    response_context: ResponseContext;
    request?: string;
    request_uri?: string;
    state?: string;
    nonce: string;
    did_doc?: DIDDocument;
    claims?: ClaimPayload;
}
export interface RequestRegistrationPayload {
    registration?: RPRegistrationMetadataPayload;
    registration_uri?: string;
}
export interface VerifiedAuthenticationRequestWithJWT extends VerifiedJWT {
    payload: AuthenticationRequestPayload;
    presentationDefinitions?: PresentationDefinitionWithLocation[];
    verifyOpts: VerifyAuthenticationRequestOpts;
}
/**
 *
 */
export interface AuthenticationRequestWithJWT {
    jwt: string;
    nonce: string;
    state: string;
    payload: AuthenticationRequestPayload;
    opts: AuthenticationRequestOpts;
}
export interface AuthenticationResponseOpts {
    redirectUri?: string;
    signatureType: InternalSignature | ExternalSignature | SuppliedSignature;
    nonce?: string;
    state?: string;
    registration: ResponseRegistrationOpts;
    responseMode?: ResponseMode;
    did: string;
    vp?: VerifiablePresentationResponseOpts[];
    expiresIn?: number;
}
export interface AuthenticationResponsePayload extends JWTPayload {
    iss: ResponseIss.SELF_ISSUED_V2 | string;
    sub: string;
    sub_type: SubjectIdentifierType;
    sub_jwk: JWK;
    aud: string;
    exp: number;
    iat: number;
    state: string;
    nonce: string;
    did: string;
    registration?: DiscoveryMetadataPayload;
    registration_uri?: string;
    verifiable_presentations?: VerifiablePresentationPayload[];
    vp_token?: VerifiablePresentationPayload;
}
export interface VerifiablePresentationsPayload {
    presentation_definition: PresentationDefinitionV1 | PresentationDefinitionV2;
}
export interface IdTokenClaimPayload {
    verifiable_presentations?: VerifiablePresentationsPayload[];
    [x: string]: unknown;
}
export interface VpTokenClaimPayload {
    presentation_definition: PresentationDefinitionV1 | PresentationDefinitionV2;
    [x: string]: unknown;
}
export interface ClaimOpts {
    presentationDefinitions?: PresentationDefinitionWithLocation[];
}
export interface ClaimPayload {
    id_token?: IdTokenClaimPayload;
    vp_token?: VpTokenClaimPayload;
    [x: string]: unknown;
}
export interface DIDDocument extends DIFDIDDocument {
    owner?: string;
    created?: string;
    updated?: string;
    proof?: LinkedDataProof;
}
export interface PresentationDefinitionWithLocation {
    location: PresentationLocation;
    definition: PresentationDefinitionV1 | PresentationDefinitionV2;
}
export interface VerifiablePresentationResponseOpts extends VerifiablePresentationPayload {
    location: PresentationLocation;
}
export declare enum PresentationLocation {
    VP_TOKEN = "vp_token",
    ID_TOKEN = "id_token"
}
/**
 * A wrapper for verifiablePresentation
 *
 */
export interface VerifiablePresentationPayload {
    format: VerifiablePresentationTypeFormat;
    presentation: PEPresentation;
}
/**
 *
 */
export interface AuthenticationResponseWithJWT {
    jwt: string;
    nonce: string;
    state: string;
    payload: AuthenticationResponsePayload;
    verifyOpts?: VerifyAuthenticationRequestOpts;
    responseOpts: AuthenticationResponseOpts;
}
export interface RequestRegistrationOpts extends RPRegistrationMetadataOpts {
    registrationBy: RegistrationType;
}
export interface DiscoveryMetadataOpts {
    authorizationEndpoint?: Schema.OPENID | string;
    scopesSupported?: Scope[] | Scope;
    subjectTypesSupported?: SubjectType[] | SubjectType;
    idTokenSigningAlgValuesSupported?: KeyAlgo[] | KeyAlgo;
    requestObjectSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    didsSupported?: boolean;
    didMethodsSupported?: string[] | string;
    credentialSupported?: boolean;
    credentialEndpoint?: string;
    credentialFormatsSupported?: CredentialFormat[] | CredentialFormat;
    credentialClaimsSupported?: string[] | string;
    credentialName?: string;
}
export interface DiscoveryMetadataPayload {
    authorization_endpoint: Schema | string;
    issuer: ResponseIss;
    response_types_supported: [ResponseType] | ResponseType;
    scopes_supported: Scope[] | Scope;
    subject_types_supported: SubjectType[] | SubjectType;
    id_token_signing_alg_values_supported: KeyAlgo[] | KeyAlgo;
    request_object_signing_alg_values_supported: SigningAlgo[] | SigningAlgo;
    dids_supported: boolean;
    did_methods_supported: string[] | string;
    credential_supported: boolean;
    credential_endpoint: string;
    credential_formats_supported: CredentialFormat[] | CredentialFormat;
    credential_claims_supported: string[] | string;
    credential_name: string;
}
export interface ResponseRegistrationOpts extends DiscoveryMetadataOpts {
    registrationBy: RegistrationType;
}
export interface RPRegistrationMetadataOpts {
    subjectIdentifiersSupported: SubjectIdentifierType[] | SubjectIdentifierType;
    didMethodsSupported?: string[] | string;
    credentialFormatsSupported: CredentialFormat[] | CredentialFormat;
}
export interface RPRegistrationMetadataPayload {
    subject_identifiers_supported: SubjectIdentifierType[] | SubjectIdentifierType;
    did_methods_supported?: string[] | string;
    credential_formats_supported: CredentialFormat[] | CredentialFormat;
}
export interface CommonSupportedMetadata {
    did_methods_supported?: string[];
    credential_formats_supported: string[];
}
export declare type ObjectBy = {
    type: PassBy.REFERENCE | PassBy.VALUE;
    referenceUri?: string;
};
export interface RegistrationType extends ObjectBy {
    id_token_encrypted_response_alg?: EncKeyAlgorithm;
    id_token_encrypted_response_enc?: EncSymmetricAlgorithmCode;
}
export declare enum VerifiablePresentationTypeFormat {
    JWT_VP = "jwt_vp",
    LDP_VP = "ldp_vp"
}
export declare enum EncSymmetricAlgorithmCode {
    XC20P = "XC20P"
}
export declare enum EncKeyAlgorithm {
    ECDH_ES = "ECDH-ES"
}
export declare enum PassBy {
    REFERENCE = "REFERENCE",
    VALUE = "VALUE"
}
export declare enum ResponseContext {
    RP = "rp",
    OP = "op"
}
export interface InternalSignature {
    hexPrivateKey: string;
    did: string;
    kid?: string;
}
export interface SuppliedSignature {
    signature: (data: string | Uint8Array) => Promise<EcdsaSignature | string>;
    did: string;
    kid: string;
}
export interface NoSignature {
    hexPublicKey: string;
    did: string;
    kid?: string;
}
export interface ExternalSignature {
    signatureUri: string;
    did: string;
    authZToken?: string;
    hexPublicKey?: string;
    kid?: string;
}
export declare enum VerificationMode {
    INTERNAL = 0,
    EXTERNAL = 1
}
export interface InternalVerification {
    mode: VerificationMode;
    resolveOpts: ResolveOpts;
}
export interface ExternalVerification {
    mode: VerificationMode;
    verifyUri: string;
    authZToken?: string;
    resolveOpts: ResolveOpts;
}
export interface VerifyAuthenticationRequestOpts {
    verification: InternalVerification | ExternalVerification;
    nonce?: string;
}
export interface VerifyAuthenticationResponseOpts {
    verification: InternalVerification | ExternalVerification;
    nonce?: string;
    state?: string;
    audience: string;
    claims?: ClaimOpts;
}
export interface ResponseClaims {
    verified_claims?: string;
    encryption_key?: JsonWebKey;
}
export interface DidAuthValidationResponse {
    signatureValidation: boolean;
    signer: VerificationMethod;
    payload: JWTPayload;
}
export interface VerifiedAuthenticationResponseWithJWT extends VerifiedJWT {
    payload: AuthenticationResponsePayload;
    verifyOpts: VerifyAuthenticationResponseOpts;
}
export declare enum ResponseMode {
    FRAGMENT = "fragment",
    FORM_POST = "form_post",
    POST = "post",
    QUERY = "query"
}
export interface SignatureResponse {
    jws: string;
}
export declare enum UrlEncodingFormat {
    FORM_URL_ENCODED = "application/x-www-form-urlencoded"
}
export declare type SIOPURI = {
    encodedUri: string;
    encodingFormat: UrlEncodingFormat;
};
export interface UriResponse extends SIOPURI {
    responseMode?: ResponseMode;
    bodyEncoded?: string;
}
export interface AuthenticationRequestURI extends SIOPURI {
    jwt?: string;
    requestOpts: AuthenticationRequestOpts;
    requestPayload: AuthenticationRequestPayload;
}
export interface ParsedAuthenticationRequestURI extends SIOPURI {
    jwt: string;
    requestPayload: AuthenticationRequestPayload;
    registration: RPRegistrationMetadataPayload;
}
export declare enum KeyType {
    EC = "EC"
}
export declare enum KeyCurve {
    SECP256k1 = "secp256k1",
    ED25519 = "ed25519"
}
export declare enum SigningAlgo {
    EDDSA = "EdDSA",
    RS256 = "RS256",
    ES256 = "ES256",
    ES256K = "ES256K",
    NONE = "none"
}
export declare enum KeyAlgo {
    EDDSA = "EdDSA",
    RS256 = "RS256",
    ES256 = "ES256",
    ES256K = "ES256K"
}
export declare enum Scope {
    OPENID = "openid",
    OPENID_DIDAUTHN = "openid did_authn"
}
export declare enum ResponseType {
    ID_TOKEN = "id_token"
}
export declare enum SubjectIdentifierType {
    JKT = "jkt",
    DID = "did"
}
export declare enum CredentialFormat {
    JSON_LD = "w3cvc-jsonld",
    JWT = "jwt"
}
export declare enum SubjectType {
    PUBLIC = "public",
    PAIRWISE = "pairwise"
}
export declare enum Schema {
    OPENID = "openid:"
}
export declare enum ResponseIss {
    SELF_ISSUED_V1 = "https://self-issued.me",
    SELF_ISSUED_V2 = "https://self-issued.me/v2"
}
export declare const isInternalSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is InternalSignature;
export declare const isExternalSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is ExternalSignature;
export declare const isSuppliedSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is SuppliedSignature;
export declare const isNoSignature: (object: InternalSignature | ExternalSignature | NoSignature) => object is NoSignature;
export declare const isRequestOpts: (object: AuthenticationRequestOpts | AuthenticationResponseOpts) => object is AuthenticationRequestOpts;
export declare const isResponseOpts: (object: AuthenticationRequestOpts | AuthenticationResponseOpts) => object is AuthenticationResponseOpts;
export declare const isRequestPayload: (object: AuthenticationRequestPayload | AuthenticationResponsePayload) => object is AuthenticationRequestPayload;
export declare const isResponsePayload: (object: AuthenticationRequestPayload | AuthenticationResponsePayload) => object is AuthenticationResponsePayload;
export declare const isInternalVerification: (object: InternalVerification | ExternalVerification) => object is InternalVerification;
export declare const isExternalVerification: (object: InternalVerification | ExternalVerification) => object is ExternalVerification;
export declare const isVP: (object: PEVerifiablePresentation | PEPresentation) => object is PEVerifiablePresentation;
export declare const isPresentation: (object: PEVerifiablePresentation | PEPresentation) => object is PEPresentation;
