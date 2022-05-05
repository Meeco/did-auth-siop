"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPresentation = exports.isVP = exports.isExternalVerification = exports.isInternalVerification = exports.isResponsePayload = exports.isRequestPayload = exports.isResponseOpts = exports.isRequestOpts = exports.isNoSignature = exports.isSuppliedSignature = exports.isExternalSignature = exports.isInternalSignature = exports.ResponseIss = exports.Schema = exports.SubjectType = exports.CredentialFormat = exports.SubjectIdentifierType = exports.ResponseType = exports.Scope = exports.KeyAlgo = exports.SigningAlgo = exports.KeyCurve = exports.KeyType = exports.UrlEncodingFormat = exports.ResponseMode = exports.VerificationMode = exports.ResponseContext = exports.PassBy = exports.EncKeyAlgorithm = exports.EncSymmetricAlgorithmCode = exports.VerifiablePresentationTypeFormat = exports.PresentationLocation = exports.expirationTime = void 0;
exports.expirationTime = 10 * 60;
var PresentationLocation;
(function (PresentationLocation) {
    PresentationLocation["VP_TOKEN"] = "vp_token";
    PresentationLocation["ID_TOKEN"] = "id_token";
})(PresentationLocation = exports.PresentationLocation || (exports.PresentationLocation = {}));
var VerifiablePresentationTypeFormat;
(function (VerifiablePresentationTypeFormat) {
    VerifiablePresentationTypeFormat["JWT_VP"] = "jwt_vp";
    VerifiablePresentationTypeFormat["LDP_VP"] = "ldp_vp";
})(VerifiablePresentationTypeFormat = exports.VerifiablePresentationTypeFormat || (exports.VerifiablePresentationTypeFormat = {}));
var EncSymmetricAlgorithmCode;
(function (EncSymmetricAlgorithmCode) {
    EncSymmetricAlgorithmCode["XC20P"] = "XC20P";
})(EncSymmetricAlgorithmCode = exports.EncSymmetricAlgorithmCode || (exports.EncSymmetricAlgorithmCode = {}));
var EncKeyAlgorithm;
(function (EncKeyAlgorithm) {
    EncKeyAlgorithm["ECDH_ES"] = "ECDH-ES";
})(EncKeyAlgorithm = exports.EncKeyAlgorithm || (exports.EncKeyAlgorithm = {}));
var PassBy;
(function (PassBy) {
    PassBy["REFERENCE"] = "REFERENCE";
    PassBy["VALUE"] = "VALUE";
})(PassBy = exports.PassBy || (exports.PassBy = {}));
var ResponseContext;
(function (ResponseContext) {
    ResponseContext["RP"] = "rp";
    ResponseContext["OP"] = "op";
})(ResponseContext = exports.ResponseContext || (exports.ResponseContext = {}));
var VerificationMode;
(function (VerificationMode) {
    VerificationMode[VerificationMode["INTERNAL"] = 0] = "INTERNAL";
    VerificationMode[VerificationMode["EXTERNAL"] = 1] = "EXTERNAL";
})(VerificationMode = exports.VerificationMode || (exports.VerificationMode = {}));
var ResponseMode;
(function (ResponseMode) {
    ResponseMode["FRAGMENT"] = "fragment";
    ResponseMode["FORM_POST"] = "form_post";
    ResponseMode["POST"] = "post";
    ResponseMode["QUERY"] = "query";
})(ResponseMode = exports.ResponseMode || (exports.ResponseMode = {}));
var UrlEncodingFormat;
(function (UrlEncodingFormat) {
    UrlEncodingFormat["FORM_URL_ENCODED"] = "application/x-www-form-urlencoded";
})(UrlEncodingFormat = exports.UrlEncodingFormat || (exports.UrlEncodingFormat = {}));
var KeyType;
(function (KeyType) {
    KeyType["EC"] = "EC";
})(KeyType = exports.KeyType || (exports.KeyType = {}));
var KeyCurve;
(function (KeyCurve) {
    KeyCurve["SECP256k1"] = "secp256k1";
    KeyCurve["ED25519"] = "ed25519";
})(KeyCurve = exports.KeyCurve || (exports.KeyCurve = {}));
var SigningAlgo;
(function (SigningAlgo) {
    SigningAlgo["EDDSA"] = "EdDSA";
    SigningAlgo["RS256"] = "RS256";
    SigningAlgo["ES256"] = "ES256";
    SigningAlgo["ES256K"] = "ES256K";
    SigningAlgo["NONE"] = "none";
})(SigningAlgo = exports.SigningAlgo || (exports.SigningAlgo = {}));
var KeyAlgo;
(function (KeyAlgo) {
    // ES256KR = "ES256K-R",
    KeyAlgo["EDDSA"] = "EdDSA";
    KeyAlgo["RS256"] = "RS256";
    KeyAlgo["ES256"] = "ES256";
    KeyAlgo["ES256K"] = "ES256K";
})(KeyAlgo = exports.KeyAlgo || (exports.KeyAlgo = {}));
var Scope;
(function (Scope) {
    Scope["OPENID"] = "openid";
    Scope["OPENID_DIDAUTHN"] = "openid did_authn";
})(Scope = exports.Scope || (exports.Scope = {}));
var ResponseType;
(function (ResponseType) {
    ResponseType["ID_TOKEN"] = "id_token";
})(ResponseType = exports.ResponseType || (exports.ResponseType = {}));
var SubjectIdentifierType;
(function (SubjectIdentifierType) {
    SubjectIdentifierType["JKT"] = "jkt";
    SubjectIdentifierType["DID"] = "did";
})(SubjectIdentifierType = exports.SubjectIdentifierType || (exports.SubjectIdentifierType = {}));
var CredentialFormat;
(function (CredentialFormat) {
    CredentialFormat["JSON_LD"] = "w3cvc-jsonld";
    CredentialFormat["JWT"] = "jwt";
})(CredentialFormat = exports.CredentialFormat || (exports.CredentialFormat = {}));
var SubjectType;
(function (SubjectType) {
    SubjectType["PUBLIC"] = "public";
    SubjectType["PAIRWISE"] = "pairwise";
})(SubjectType = exports.SubjectType || (exports.SubjectType = {}));
var Schema;
(function (Schema) {
    Schema["OPENID"] = "openid:";
})(Schema = exports.Schema || (exports.Schema = {}));
var ResponseIss;
(function (ResponseIss) {
    ResponseIss["SELF_ISSUED_V1"] = "https://self-issued.me";
    ResponseIss["SELF_ISSUED_V2"] = "https://self-issued.me/v2";
})(ResponseIss = exports.ResponseIss || (exports.ResponseIss = {}));
const isInternalSignature = (object) => 'hexPrivateKey' in object && 'did' in object;
exports.isInternalSignature = isInternalSignature;
const isExternalSignature = (object) => 'signatureUri' in object && 'did' in object;
exports.isExternalSignature = isExternalSignature;
const isSuppliedSignature = (object) => 'signature' in object;
exports.isSuppliedSignature = isSuppliedSignature;
const isNoSignature = (object) => 'hexPublicKey' in object && 'did' in object;
exports.isNoSignature = isNoSignature;
const isRequestOpts = (object) => 'requestBy' in object;
exports.isRequestOpts = isRequestOpts;
const isResponseOpts = (object) => 'did' in object;
exports.isResponseOpts = isResponseOpts;
const isRequestPayload = (object) => 'response_mode' in object && 'response_type' in object;
exports.isRequestPayload = isRequestPayload;
const isResponsePayload = (object) => 'iss' in object && 'aud' in object;
exports.isResponsePayload = isResponsePayload;
const isInternalVerification = (object) => object.mode === VerificationMode.INTERNAL; /* && !isExternalVerification(object)*/
exports.isInternalVerification = isInternalVerification;
const isExternalVerification = (object) => object.mode === VerificationMode.EXTERNAL; /*&& 'verifyUri' in object || 'authZToken' in object*/
exports.isExternalVerification = isExternalVerification;
const isVP = (object) => 'presentation' in object;
exports.isVP = isVP;
const isPresentation = (object) => 'presentation_submission' in object;
exports.isPresentation = isPresentation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lPUC50eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYWluL3R5cGVzL1NJT1AudHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBUWEsUUFBQSxjQUFjLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQWtKdEMsSUFBWSxvQkFHWDtBQUhELFdBQVksb0JBQW9CO0lBQzlCLDZDQUFxQixDQUFBO0lBQ3JCLDZDQUFxQixDQUFBO0FBQ3ZCLENBQUMsRUFIVyxvQkFBb0IsR0FBcEIsNEJBQW9CLEtBQXBCLDRCQUFvQixRQUcvQjtBQWtHRCxJQUFZLGdDQUdYO0FBSEQsV0FBWSxnQ0FBZ0M7SUFDMUMscURBQWlCLENBQUE7SUFDakIscURBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQUhXLGdDQUFnQyxHQUFoQyx3Q0FBZ0MsS0FBaEMsd0NBQWdDLFFBRzNDO0FBRUQsSUFBWSx5QkFFWDtBQUZELFdBQVkseUJBQXlCO0lBQ25DLDRDQUFlLENBQUE7QUFDakIsQ0FBQyxFQUZXLHlCQUF5QixHQUF6QixpQ0FBeUIsS0FBekIsaUNBQXlCLFFBRXBDO0FBRUQsSUFBWSxlQUVYO0FBRkQsV0FBWSxlQUFlO0lBQ3pCLHNDQUFtQixDQUFBO0FBQ3JCLENBQUMsRUFGVyxlQUFlLEdBQWYsdUJBQWUsS0FBZix1QkFBZSxRQUUxQjtBQUVELElBQVksTUFHWDtBQUhELFdBQVksTUFBTTtJQUNoQixpQ0FBdUIsQ0FBQTtJQUN2Qix5QkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFIVyxNQUFNLEdBQU4sY0FBTSxLQUFOLGNBQU0sUUFHakI7QUFFRCxJQUFZLGVBR1g7QUFIRCxXQUFZLGVBQWU7SUFDekIsNEJBQVMsQ0FBQTtJQUNULDRCQUFTLENBQUE7QUFDWCxDQUFDLEVBSFcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFHMUI7QUE0QkQsSUFBWSxnQkFHWDtBQUhELFdBQVksZ0JBQWdCO0lBQzFCLCtEQUFRLENBQUE7SUFD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