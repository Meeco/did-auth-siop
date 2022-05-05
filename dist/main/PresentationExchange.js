"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresentationExchange = void 0;
const pex_1 = require("@sphereon/pex");
const ObjectUtils_1 = require("./functions/ObjectUtils");
const types_1 = require("./types");
const SIOP_types_1 = require("./types/SIOP.types");
class PresentationExchange {
    constructor(opts) {
        this.pejs = new pex_1.PEX();
        this.did = opts.did;
        this.allVerifiableCredentials = opts.allVerifiableCredentials;
    }
    /**
     * Construct presentation submission from selected credentials
     * @param presentationDefinition: payload object received by the OP from the RP
     * @param selectedCredentials
     */
    submissionFrom(presentationDefinition, selectedCredentials, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!presentationDefinition) {
                throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
            }
            function sign(params) {
                console.log('##### SIGN CALLBACK IMPLEMENTATION NEEDED FOR VP');
                console.log(params);
                return params.presentation;
            }
            const challenge = options === null || options === void 0 ? void 0 : options.nonce;
            const domain = options === null || options === void 0 ? void 0 : options.domain;
            // fixme: this needs to be configurable
            const signOptions = {
                proofOptions: {
                    proofPurpose: pex_1.ProofPurpose.authentication,
                    type: pex_1.ProofType.EcdsaSecp256k1Signature2019,
                    challenge,
                    domain,
                },
                signatureOptions: {
                    verificationMethod: `${this.did}#key`,
                    keyEncoding: pex_1.KeyEncoding.Hex,
                },
            };
            return this.pejs.verifiablePresentationFrom(presentationDefinition, selectedCredentials, sign, signOptions);
        });
    }
    /**
     * This method will be called from the OP when we are certain that we have a
     * PresentationDefinition object inside our requestPayload
     * Finds a set of `VerifiableCredential`s from a list supplied to this class during construction,
     * matching presentationDefinition object found in the requestPayload
     * if requestPayload doesn't contain any valid presentationDefinition throws an error
     * if PE-JS library returns any error in the process, throws the error
     * returns the SelectResults object if successful
     * @param presentationDefinition: object received by the OP from the RP
     */
    selectVerifiableCredentialsForSubmission(presentationDefinition) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!presentationDefinition) {
                throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
            }
            else if (!this.allVerifiableCredentials || this.allVerifiableCredentials.length == 0) {
                throw new Error(`${types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD}, no VCs were provided`);
            }
            const selectResults = this.pejs.selectFrom(presentationDefinition, 
            // fixme holder dids and limited disclosure
            this.allVerifiableCredentials, [this.did], []);
            if (selectResults.errors.length) {
                throw new Error(`message: ${types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD}, details: ${JSON.stringify(selectResults.errors)}`);
            }
            return selectResults;
        });
    }
    /**
     * validatePresentationAgainstDefinition function is called mainly by the RP
     * after receiving the VP from the OP
     * @param presentationDefinition: object containing PD
     * @param verifiablePresentation:
     */
    static validatePresentationAgainstDefinition(presentationDefinition, verifiablePresentation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!presentationDefinition) {
                throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
            }
            const evaluationResults = new pex_1.PEX().evaluatePresentation(presentationDefinition, verifiablePresentation);
            if (evaluationResults.errors.length) {
                throw new Error(`message: ${types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD}, details: ${JSON.stringify(evaluationResults.errors)}`);
            }
            return evaluationResults;
        });
    }
    static assertValidPresentationSubmission(presentationSubmission) {
        const validationResult = new pex_1.PEX().validateSubmission(presentationSubmission);
        if (validationResult[0].message != 'ok') {
            throw new Error(`${types_1.SIOPErrors.RESPONSE_OPTS_PRESENTATIONS_SUBMISSION_IS_NOT_VALID}, details ${JSON.stringify(validationResult[0])}`);
        }
    }
    /**
     * Finds a valid PresentationDefinition inside the given AuthenticationRequestPayload
     * throws exception if the PresentationDefinition is not valid
     * returns null if no property named "presentation_definition" is found
     * returns a PresentationDefinition if a valid instance found
     * @param obj: object that can have a presentation_definition inside
     */
    static findValidPresentationDefinitions(obj) {
        let allDefinitions;
        function extractPDFromVPToken() {
            const vpTokens = (0, ObjectUtils_1.extractDataFromPath)(obj, '$..vp_token.presentation_definition');
            if (vpTokens) {
                if (vpTokens.length == 1) {
                    PresentationExchange.assertValidPresentationDefinition(vpTokens[0].value);
                    allDefinitions = [{ definition: vpTokens[0].value, location: SIOP_types_1.PresentationLocation.VP_TOKEN }];
                }
                else if (vpTokens.length > 1)
                    throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
            }
        }
        function extractPDFromOtherTokens() {
            const definitions = (0, ObjectUtils_1.extractDataFromPath)(obj, '$..verifiable_presentations.presentation_definition');
            if (definitions && definitions.length) {
                definitions.forEach((definition) => {
                    PresentationExchange.assertValidPresentationDefinition(definition.value);
                    if (definition.path.includes(SIOP_types_1.PresentationLocation.ID_TOKEN)) {
                        const defWithLocation = { definition: definition.value, location: SIOP_types_1.PresentationLocation.ID_TOKEN };
                        if (!allDefinitions) {
                            allDefinitions = [defWithLocation];
                        }
                        else {
                            allDefinitions.push(defWithLocation);
                        }
                    }
                    else {
                        throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
                    }
                });
            }
        }
        if (obj) {
            extractPDFromVPToken();
            extractPDFromOtherTokens();
        }
        return allDefinitions;
    }
    static assertValidPresentationDefintionWithLocations(defintionWithLocations) {
        if (defintionWithLocations && defintionWithLocations.length > 0) {
            defintionWithLocations.forEach((definitionWithLocation) => PresentationExchange.assertValidPresentationDefinition(definitionWithLocation.definition));
        }
    }
    static assertValidPresentationDefintionWithLocation(defintionWithLocation) {
        if (defintionWithLocation && defintionWithLocation.definition) {
            PresentationExchange.assertValidPresentationDefinition(defintionWithLocation.definition);
        }
    }
    static assertValidPresentationDefinition(presentationDefinition) {
        const validationResult = new pex_1.PEX().validateDefinition(presentationDefinition);
        if (validationResult[0].message != 'ok') {
            throw new Error(`${types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID}`);
        }
    }
    static validatePayloadsAgainstDefinitions(definitions, vpPayloads) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!definitions || !vpPayloads || !definitions.length || definitions.length !== vpPayloads.length) {
                throw new Error(types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD);
            }
            yield Promise.all(definitions.map((pd) => __awaiter(this, void 0, void 0, function* () { return yield PresentationExchange.validatePayloadAgainstDefinitions(pd.definition, vpPayloads); })));
        });
    }
    static validatePayloadAgainstDefinitions(definition, vpPayloads) {
        return __awaiter(this, void 0, void 0, function* () {
            function filterValidPresentations() {
                const checkedPresentations = vpPayloads.filter((vpw) => {
                    if (vpw.format !== SIOP_types_1.VerifiablePresentationTypeFormat.LDP_VP) {
                        throw new Error(`${types_1.SIOPErrors.VERIFIABLE_PRESENTATION_FORMAT_NOT_SUPPORTED}`);
                    }
                    const presentation = vpw.presentation;
                    // fixme: Limited disclosure suites
                    const evaluationResults = new pex_1.PEX().evaluatePresentation(definition, presentation, []);
                    const submission = evaluationResults.value;
                    if (!presentation || !submission) {
                        throw new Error(types_1.SIOPErrors.NO_PRESENTATION_SUBMISSION);
                    }
                    return submission && submission.definition_id === definition.id;
                });
                return checkedPresentations;
            }
            const checkedPresentations = filterValidPresentations();
            if (!checkedPresentations.length || checkedPresentations.length != 1) {
                throw new Error(`${types_1.SIOPErrors.COULD_NOT_FIND_VCS_MATCHING_PD}`);
            }
            else if (checkedPresentations[0].format !== SIOP_types_1.VerifiablePresentationTypeFormat.LDP_VP) {
                throw new Error(`${types_1.SIOPErrors.VERIFIABLE_PRESENTATION_FORMAT_NOT_SUPPORTED}`);
            }
            const presentation = checkedPresentations[0].presentation;
            // fixme: Limited disclosure suites
            const evaluationResults = new pex_1.PEX().evaluatePresentation(definition, presentation, []);
            PresentationExchange.assertValidPresentationSubmission(evaluationResults.value);
            yield PresentationExchange.validatePresentationAgainstDefinition(definition, presentation);
        });
    }
}
exports.PresentationExchange = PresentationExchange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJlc2VudGF0aW9uRXhjaGFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbWFpbi9QcmVzZW50YXRpb25FeGNoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FhdUI7QUFHdkIseURBQThEO0FBQzlELG1DQUFxQztBQUVyQyxtREFLNEI7QUFFNUIsTUFBYSxvQkFBb0I7SUFLL0IsWUFBWSxJQUF3RTtRQUozRSxTQUFJLEdBQUcsSUFBSSxTQUFHLEVBQUUsQ0FBQztRQUt4QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUNoRSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNVLGNBQWMsQ0FDekIsc0JBQStDLEVBQy9DLG1CQUE0QyxFQUM1QyxPQUE2Qzs7WUFFN0MsSUFBSSxDQUFDLHNCQUFzQixFQUFFO2dCQUMzQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsZ0RBQWdELENBQUMsQ0FBQzthQUM5RTtZQUVELFNBQVMsSUFBSSxDQUFDLE1BQXNDO2dCQUNsRCxPQUFPLENBQUMsR0FBRyxDQUFDLGtEQUFrRCxDQUFDLENBQUM7Z0JBQ2hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sTUFBTSxDQUFDLFlBQXVDLENBQUM7WUFDeEQsQ0FBQztZQUVELE1BQU0sU0FBUyxHQUFXLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLENBQUM7WUFDekMsTUFBTSxNQUFNLEdBQVcsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE1BQU0sQ0FBQztZQUV2Qyx1Q0FBdUM7WUFDdkMsTUFBTSxXQUFXLEdBQTRCO2dCQUMzQyxZQUFZLEVBQUU7b0JBQ1osWUFBWSxFQUFFLGtCQUFZLENBQUMsY0FBYztvQkFDekMs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