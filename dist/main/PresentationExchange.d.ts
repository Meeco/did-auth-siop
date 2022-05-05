import { EvaluationResults, IPresentation, IPresentationDefinition, IVerifiableCredential, IVerifiablePresentation, PEX, SelectResults } from '@sphereon/pex';
import { PresentationSubmission } from '@sphereon/pex-models';
import { JWTPayload } from './types/JWT.types';
import { PresentationDefinitionWithLocation, VerifiablePresentationPayload } from './types/SIOP.types';
export declare class PresentationExchange {
    readonly pejs: PEX;
    readonly allVerifiableCredentials: IVerifiableCredential[];
    readonly did: any;
    constructor(opts: {
        did: string;
        allVerifiableCredentials: IVerifiableCredential[];
    });
    /**
     * Construct presentation submission from selected credentials
     * @param presentationDefinition: payload object received by the OP from the RP
     * @param selectedCredentials
     */
    submissionFrom(presentationDefinition: IPresentationDefinition, selectedCredentials: IVerifiableCredential[], options?: {
        nonce?: string;
        domain?: string;
    }): Promise<IVerifiablePresentation>;
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
    selectVerifiableCredentialsForSubmission(presentationDefinition: IPresentationDefinition): Promise<SelectResults>;
    /**
     * validatePresentationAgainstDefinition function is called mainly by the RP
     * after receiving the VP from the OP
     * @param presentationDefinition: object containing PD
     * @param verifiablePresentation:
     */
    static validatePresentationAgainstDefinition(presentationDefinition: IPresentationDefinition, verifiablePresentation: IPresentation): Promise<EvaluationResults>;
    static assertValidPresentationSubmission(presentationSubmission: PresentationSubmission): void;
    /**
     * Finds a valid PresentationDefinition inside the given AuthenticationRequestPayload
     * throws exception if the PresentationDefinition is not valid
     * returns null if no property named "presentation_definition" is found
     * returns a PresentationDefinition if a valid instance found
     * @param obj: object that can have a presentation_definition inside
     */
    static findValidPresentationDefinitions(obj: JWTPayload): PresentationDefinitionWithLocation[];
    static assertValidPresentationDefintionWithLocations(defintionWithLocations: PresentationDefinitionWithLocation[]): void;
    static assertValidPresentationDefintionWithLocation(defintionWithLocation: PresentationDefinitionWithLocation): void;
    private static assertValidPresentationDefinition;
    static validatePayloadsAgainstDefinitions(definitions: PresentationDefinitionWithLocation[], vpPayloads: VerifiablePresentationPayload[]): Promise<void>;
    private static validatePayloadAgainstDefinitions;
}
