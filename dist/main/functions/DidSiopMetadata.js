"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidMetadata = void 0;
const types_1 = require("../types");
function assertValidMetadata(opMetadata, rpMetadata) {
    let methods = [];
    const credentials = supportedCredentialsFormats(rpMetadata.credential_formats_supported, opMetadata.credential_formats_supported);
    const isDid = verifySubjectIdentifiers(rpMetadata.subject_identifiers_supported);
    if (isDid && rpMetadata.did_methods_supported) {
        methods = supportedDidMethods(rpMetadata.did_methods_supported, opMetadata.did_methods_supported);
    }
    else if (isDid && (!rpMetadata.did_methods_supported || !rpMetadata.did_methods_supported.length)) {
        if (opMetadata.did_methods_supported || opMetadata.did_methods_supported.length) {
            methods = [...opMetadata.did_methods_supported];
        }
    }
    return { credential_formats_supported: credentials, did_methods_supported: methods };
}
exports.assertValidMetadata = assertValidMetadata;
function getIntersection(rpMetadata, opMetadata) {
    let arrayA, arrayB;
    if (!Array.isArray(rpMetadata)) {
        arrayA = [rpMetadata];
    }
    else {
        arrayA = rpMetadata;
    }
    if (!Array.isArray(opMetadata)) {
        arrayB = [opMetadata];
    }
    else {
        arrayB = opMetadata;
    }
    return arrayA.filter((value) => arrayB.includes(value));
}
function verifySubjectIdentifiers(subjectIdentifiers) {
    if (subjectIdentifiers || subjectIdentifiers.length) {
        if (Array.isArray(subjectIdentifiers)) {
            return subjectIdentifiers.includes(types_1.SIOP.SubjectIdentifierType.DID);
        }
        return subjectIdentifiers === types_1.SIOP.SubjectIdentifierType.DID;
    }
    else {
        return false;
    }
}
function supportedDidMethods(rpMethods, opMethods) {
    const supportedDidMethods = getIntersection(rpMethods, opMethods);
    if (!supportedDidMethods.length) {
        throw Error(types_1.SIOPErrors.DID_METHODS_NOT_SUPORTED);
    }
    return supportedDidMethods;
}
function supportedCredentialsFormats(rpCredentials, opCredentials) {
    const supportedCredentials = getIntersection(rpCredentials, opCredentials);
    if (!supportedCredentials.length) {
        throw new Error(types_1.SIOPErrors.CREDENTIAL_FORMATS_NOT_SUPPORTED);
    }
    return supportedCredentials;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlkU2lvcE1ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vZnVuY3Rpb25zL0RpZFNpb3BNZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQ0FBNEM7QUFHNUMsU0FBZ0IsbUJBQW1CLENBQUMsVUFBb0MsRUFBRSxVQUF5QztJQUNqSCxJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDakIsTUFBTSxXQUFXLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxDQUFDLDRCQUE0QixFQUFFLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0lBQ2xJLE1BQU0sS0FBSyxHQUFHLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ2pGLElBQUksS0FBSyxJQUFJLFVBQVUsQ0FBQyxxQkFBcUIsRUFBRTtRQUM3QyxPQUFPLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxDQUFDLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0tBQ25HO1NBQU0sSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNuRyxJQUFJLFVBQVUsQ0FBQyxxQkFBcUIsSUFBSSxVQUFVLENBQUMscUJBQXFCLENBQUMsTUFBTSxFQUFFO1lBQy9FLE9BQU8sR0FBRyxDQUFDLEdBQUcsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDakQ7S0FDRjtJQUNELE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDdkYsQ0FBQztBQVpELGtEQVlDO0FBRUQsU0FBUyxlQUFlLENBQUksVUFBd0IsRUFBRSxVQUF3QjtJQUM1RSxJQUFJLE1BQU0sRUFBRSxNQUFNLENBQUM7SUFDbkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDOUIsTUFBTSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdkI7U0FBTTtRQUNMLE1BQU0sR0FBRyxVQUFVLENBQUM7S0FDckI7SUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM5QixNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUN2QjtTQUFNO1FBQ0wsTUFBTSxHQUFHLFVBQVUsQ0FBQztLQUNyQjtJQUNELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxTQUFTLHdCQUF3QixDQUFDLGtCQUFtRTtJQUNuRyxJQUFJLGtCQUFrQixJQUFJLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtRQUNuRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUNyQyxPQUFPLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxZQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEU7UUFDRCxPQUFPLGtCQUFrQixLQUFLLFlBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUM7S0FDOUQ7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxTQUE0QixFQUFFLFNBQTRCO0lBQ3JGLE1BQU0sbUJBQW1CLEdBQUcsZUFBZSxDQUFDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNsRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFO1FBQy9CLE1BQU0sS0FBSyxDQUFDLGtCQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQztLQUNsRDtJQUNELE9BQU8sbUJBQW1CLENBQUM7QUFDN0IsQ0FBQztBQUVELFNBQVMsMkJBQTJCLENBQUMsYUFBZ0MsRUFBRSxhQUFnQztJQUNyRyxNQUFNLG9CQUFvQixHQUFHLGVBQWUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDM0UsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRTtRQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUM5RDtJQUNELE9BQU8sb0JBQW9CLENBQUM7QUFDOUIsQ0FBQyJ9