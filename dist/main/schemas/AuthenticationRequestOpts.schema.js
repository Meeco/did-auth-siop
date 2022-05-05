"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationRequestOptsSchema = void 0;
exports.AuthenticationRequestOptsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/AuthenticationRequestOpts",
    "definitions": {
        "AuthenticationRequestOpts": {
            "type": "object",
            "properties": {
                "redirectUri": {
                    "type": "string"
                },
                "requestBy": {
                    "$ref": "#/definitions/ObjectBy"
                },
                "signatureType": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/InternalSignature"
                        },
                        {
                            "$ref": "#/definitions/ExternalSignature"
                        },
                        {
                            "$ref": "#/definitions/SuppliedSignature"
                        },
                        {
                            "$ref": "#/definitions/NoSignature"
                        }
                    ]
                },
                "responseMode": {
                    "$ref": "#/definitions/ResponseMode"
                },
                "responseContext": {
                    "$ref": "#/definitions/ResponseContext"
                },
                "claims": {
                    "$ref": "#/definitions/ClaimOpts"
                },
                "registration": {
                    "$ref": "#/definitions/RequestRegistrationOpts"
                },
                "nonce": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                }
            },
            "required": [
                "redirectUri",
                "requestBy",
                "signatureType",
                "registration"
            ],
            "additionalProperties": false
        },
        "ObjectBy": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "REFERENCE",
                        "VALUE"
                    ]
                },
                "referenceUri": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        },
        "InternalSignature": {
            "type": "object",
            "properties": {
                "hexPrivateKey": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "hexPrivateKey",
                "did"
            ],
            "additionalProperties": false
        },
        "ExternalSignature": {
            "type": "object",
            "properties": {
                "signatureUri": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "authZToken": {
                    "type": "string"
                },
                "hexPublicKey": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "signatureUri",
                "did"
            ],
            "additionalProperties": false
        },
        "SuppliedSignature": {
            "type": "object",
            "properties": {
                "did": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "did",
                "kid"
            ],
            "additionalProperties": true
        },
        "NoSignature": {
            "type": "object",
            "properties": {
                "hexPublicKey": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "hexPublicKey",
                "did"
            ],
            "additionalProperties": false
        },
        "ResponseMode": {
            "type": "string",
            "enum": [
                "fragment",
                "form_post",
                "post",
                "query"
            ]
        },
        "ResponseContext": {
            "type": "string",
            "enum": [
                "rp",
                "op"
            ]
        },
        "ClaimOpts": {
            "type": "object",
            "properties": {
                "presentationDefinitions": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/PresentationDefinitionWithLocation"
                    }
                }
            },
            "additionalProperties": false
        },
        "PresentationDefinitionWithLocation": {
            "type": "object",
            "properties": {
                "location": {
                    "$ref": "#/definitions/PresentationLocation"
                },
                "definition": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/PresentationDefinitionV1"
                        },
                        {
                            "$ref": "#/definitions/PresentationDefinitionV2"
                        }
                    ]
                }
            },
            "required": [
                "location",
                "definition"
            ],
            "additionalProperties": false
        },
        "PresentationLocation": {
            "type": "string",
            "enum": [
                "vp_token",
                "id_token"
            ]
        },
        "PresentationDefinitionV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "format": {
                    "$ref": "#/definitions/Format"
                },
                "submission_requirements": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                },
                "input_descriptors": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/InputDescriptorV1"
                    }
                }
            },
            "required": [
                "id",
                "input_descriptors"
            ],
            "additionalProperties": false
        },
        "Format": {
            "type": "object",
            "properties": {
                "jwt": {
                    "$ref": "#/definitions/JwtObject"
                },
                "jwt_vc": {
                    "$ref": "#/definitions/JwtObject"
                },
                "jwt_vp": {
                    "$ref": "#/definitions/JwtObject"
                },
                "ldp": {
                    "$ref": "#/definitions/LdpObject"
                },
                "ldp_vc": {
                    "$ref": "#/definitions/LdpObject"
                },
                "ldp_vp": {
                    "$ref": "#/definitions/LdpObject"
                }
            },
            "additionalProperties": false
        },
        "JwtObject": {
            "type": "object",
            "properties": {
                "alg": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "alg"
            ],
            "additionalProperties": false
        },
        "LdpObject": {
            "type": "object",
            "properties": {
                "proof_type": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "proof_type"
            ],
            "additionalProperties": false
        },
        "SubmissionRequirement": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "rule": {
                    "$ref": "#/definitions/Rules"
                },
                "count": {
                    "type": "number"
                },
                "min": {
                    "type": "number"
                },
                "max": {
                    "type": "number"
                },
                "from": {
                    "type": "string"
                },
                "from_nested": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                }
            },
            "required": [
                "rule"
            ],
            "additionalProperties": false
        },
        "Rules": {
            "type": "string",
            "enum": [
                "all",
                "pick"
            ]
        },
        "InputDescriptorV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "group": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "schema": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Schema"
                    }
                },
                "constraints": {
                    "$ref": "#/definitions/ConstraintsV1"
                }
            },
            "required": [
                "id",
                "schema"
            ],
            "additionalProperties": false
        },
        "Schema": {
            "type": "object",
            "properties": {
                "uri": {
                    "type": "string"
                },
                "required": {
                    "type": "boolean"
                }
            },
            "required": [
                "uri"
            ],
            "additionalProperties": false
        },
        "ConstraintsV1": {
            "type": "object",
            "properties": {
                "limit_disclosure": {
                    "$ref": "#/definitions/Optionality"
                },
                "statuses": {
                    "$ref": "#/definitions/Statuses"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/FieldV1"
                    }
                },
                "subject_is_issuer": {
                    "$ref": "#/definitions/Optionality"
                },
                "is_holder": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                },
                "same_subject": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                }
            },
            "additionalProperties": false
        },
        "Optionality": {
            "type": "string",
            "enum": [
                "required",
                "preferred"
            ]
        },
        "Statuses": {
            "type": "object",
            "properties": {
                "active": {
                    "$ref": "#/definitions/PdStatus"
                },
                "suspended": {
                    "$ref": "#/definitions/PdStatus"
                },
                "revoked": {
                    "$ref": "#/definitions/PdStatus"
                }
            },
            "additionalProperties": false
        },
        "PdStatus": {
            "type": "object",
            "properties": {
                "directive": {
                    "$ref": "#/definitions/Directives"
                }
            },
            "additionalProperties": false
        },
        "Directives": {
            "type": "string",
            "enum": [
                "required",
                "allowed",
                "disallowed"
            ]
        },
        "FieldV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "path": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "purpose": {
                    "type": "string"
                },
                "filter": {
                    "$ref": "#/definitions/FilterV1"
                },
                "predicate": {
                    "$ref": "#/definitions/Optionality"
                }
            },
            "additionalProperties": false
        },
        "FilterV1": {
            "type": "object",
            "properties": {
                "_const": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "_enum": {
                    "type": "array",
                    "items": {
                        "type": [
                            "number",
                            "string"
                        ]
                    }
                },
                "exclusiveMinimum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "exclusiveMaximum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "format": {
                    "type": "string"
                },
                "minLength": {
                    "type": "number"
                },
                "maxLength": {
                    "type": "number"
                },
                "minimum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "maximum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "not": {
                    "type": "object"
                },
                "pattern": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        },
        "HolderSubject": {
            "type": "object",
            "properties": {
                "field_id": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "directive": {
                    "$ref": "#/definitions/Optionality"
                }
            },
            "required": [
                "field_id",
                "directive"
            ],
            "additionalProperties": false
        },
        "PresentationDefinitionV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "format": {
                    "$ref": "#/definitions/Format"
                },
                "submission_requirements": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                },
                "input_descriptors": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/InputDescriptorV2"
                    }
                },
                "frame": {
                    "type": "object"
                }
            },
            "required": [
                "id",
                "input_descriptors"
            ],
            "additionalProperties": false
        },
        "InputDescriptorV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "group": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "constraints": {
                    "$ref": "#/definitions/ConstraintsV2"
                }
            },
            "required": [
                "id"
            ],
            "additionalProperties": false
        },
        "ConstraintsV2": {
            "type": "object",
            "properties": {
                "limit_disclosure": {
                    "$ref": "#/definitions/Optionality"
                },
                "statuses": {
                    "$ref": "#/definitions/Statuses"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/FieldV2"
                    }
                },
                "subject_is_issuer": {
                    "$ref": "#/definitions/Optionality"
                },
                "is_holder": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                },
                "same_subject": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                }
            },
            "additionalProperties": false
        },
        "FieldV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "path": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "purpose": {
                    "type": "string"
                },
                "filter": {
                    "$ref": "#/definitions/FilterV2"
                },
                "predicate": {
                    "$ref": "#/definitions/Optionality"
                }
            },
            "additionalProperties": false
        },
        "FilterV2": {
            "type": "object",
            "properties": {
                "_const": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "_enum": {
                    "type": "array",
                    "items": {
                        "type": [
                            "number",
                            "string"
                        ]
                    }
                },
                "exclusiveMinimum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "exclusiveMaximum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "format": {
                    "type": "string"
                },
                "formatMaximum": {
                    "type": "string"
                },
                "formatMinimum": {
                    "type": "string"
                },
                "formatExclusiveMaximum": {
                    "type": "string"
                },
                "formatExclusiveMinimum": {
                    "type": "string"
                },
                "minLength": {
                    "type": "number"
                },
                "maxLength": {
                    "type": "number"
                },
                "minimum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "maximum": {
                    "type": [
                        "number",
                        "string",
                        "null"
                    ]
                },
                "not": {
                    "type": "object"
                },
                "pattern": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        },
        "RequestRegistrationOpts": {
            "type": "object",
            "properties": {
                "subjectIdentifiersSupported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/SubjectIdentifierType"
                            }
                        },
                        {
                            "$ref": "#/definitions/SubjectIdentifierType"
                        }
                    ]
                },
                "didMethodsSupported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "credentialFormatsSupported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/CredentialFormat"
                            }
                        },
                        {
                            "$ref": "#/definitions/CredentialFormat"
                        }
                    ]
                },
                "registrationBy": {
                    "$ref": "#/definitions/RegistrationType"
                }
            },
            "required": [
                "credentialFormatsSupported",
                "registrationBy",
                "subjectIdentifiersSupported"
            ],
            "additionalProperties": false
        },
        "SubjectIdentifierType": {
            "type": "string",
            "enum": [
                "jkt",
                "did"
            ]
        },
        "CredentialFormat": {
            "type": "string",
            "enum": [
                "w3cvc-jsonld",
                "jwt"
            ]
        },
        "RegistrationType": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "enum": [
                        "REFERENCE",
                        "VALUE"
                    ]
                },
                "referenceUri": {
                    "type": "string"
                },
                "id_token_encrypted_response_alg": {
                    "$ref": "#/definitions/EncKeyAlgorithm"
                },
                "id_token_encrypted_response_enc": {
                    "$ref": "#/definitions/EncSymmetricAlgorithmCode"
                }
            },
            "additionalProperties": false,
            "required": [
                "type"
            ]
        },
        "EncKeyAlgorithm": {
            "type": "string",
            "const": "ECDH-ES"
        },
        "EncSymmetricAlgorithmCode": {
            "type": "string",
            "const": "XC20P"
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXF1ZXN0T3B0cy5zY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbWFpbi9zY2hlbWFzL0F1dGhlbnRpY2F0aW9uUmVxdWVzdE9wdHMuc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsK0JBQStCLEdBQUc7SUFDN0MsU0FBUyxFQUFFLHlDQUF5QztJQUNwRCxNQUFNLEVBQUUseUNBQXlDO0lBQ2pELGFBQWEsRUFBRTtRQUNiLDJCQUEyQixFQUFFO1lBQzNCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFlBQVksRUFBRTtnQkFDWixhQUFhLEVBQUU7b0JBQ2IsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxNQUFNLEVBQUUsd0JBQXdCO2lCQUNqQztnQkFDRCxlQUFlLEVBQUU7b0JBQ2YsT0FBTyxFQUFFO3dCQUNQOzRCQUNFLE1BQU0sRUFBRSxpQ0FBaUM7eUJBQzFDO3dCQUNEOzRCQUNFLE1BQU0sRUFBRSxpQ0FBaUM7eUJBQzFDO3dCQUNEOzRCQUNFLE1BQU0sRUFBRSxpQ0FBaUM7eUJBQzFDO3dCQUNEOzRCQUNFLE1BQU0sRUFBRSwyQkFBMkI7eUJBQ3BDO3FCQUNGO2lCQUNGO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxNQUFNLEVBQUUsNEJBQTRCO2lCQUNyQztnQkFDRCxpQkFBaUIsRUFBRTtvQkFDakIsTUFBTSxFQUFFLCtCQUErQjtpQkFDeEM7Z0JBQ0QsUUFBUSxFQUFFO29CQUNSLE1BQU0sRUFBRSx5QkFBeUI7aUJBQ2xDO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxNQUFNLEVBQUUsdUNBQXVDO2lCQUNoRDtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7YUFDRjtZQUNELFVBQVUsRUFBRTtnQkFDVixhQUFhO2dC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