"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationResponseOptsSchema = void 0;
exports.AuthenticationResponseOptsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/AuthenticationResponseOpts",
    "definitions": {
        "AuthenticationResponseOpts": {
            "type": "object",
            "properties": {
                "redirectUri": {
                    "type": "string"
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
                        }
                    ]
                },
                "nonce": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "registration": {
                    "$ref": "#/definitions/ResponseRegistrationOpts"
                },
                "responseMode": {
                    "$ref": "#/definitions/ResponseMode"
                },
                "did": {
                    "type": "string"
                },
                "vp": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/VerifiablePresentationResponseOpts"
                    }
                },
                "expiresIn": {
                    "type": "number"
                }
            },
            "required": [
                "signatureType",
                "registration",
                "did"
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
        "ResponseRegistrationOpts": {
            "type": "object",
            "properties": {
                "authorizationEndpoint": {
                    "type": "string"
                },
                "scopesSupported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/Scope"
                            }
                        },
                        {
                            "$ref": "#/definitions/Scope"
                        }
                    ]
                },
                "subjectTypesSupported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/SubjectType"
                            }
                        },
                        {
                            "$ref": "#/definitions/SubjectType"
                        }
                    ]
                },
                "idTokenSigningAlgValuesSupported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/KeyAlgo"
                            }
                        },
                        {
                            "$ref": "#/definitions/KeyAlgo"
                        }
                    ]
                },
                "requestObjectSigningAlgValuesSupported": {
                    "anyOf": [
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/SigningAlgo"
                            }
                        },
                        {
                            "$ref": "#/definitions/SigningAlgo"
                        }
                    ]
                },
                "didsSupported": {
                    "type": "boolean"
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
                "credentialSupported": {
                    "type": "boolean"
                },
                "credentialEndpoint": {
                    "type": "string"
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
                "credentialClaimsSupported": {
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
                "credentialName": {
                    "type": "string"
                },
                "registrationBy": {
                    "$ref": "#/definitions/RegistrationType"
                }
            },
            "required": [
                "registrationBy"
            ],
            "additionalProperties": false
        },
        "Scope": {
            "type": "string",
            "enum": [
                "openid",
                "openid did_authn"
            ]
        },
        "SubjectType": {
            "type": "string",
            "enum": [
                "public",
                "pairwise"
            ]
        },
        "KeyAlgo": {
            "type": "string",
            "enum": [
                "EdDSA",
                "RS256",
                "ES256",
                "ES256K"
            ]
        },
        "SigningAlgo": {
            "type": "string",
            "enum": [
                "EdDSA",
                "RS256",
                "ES256",
                "ES256K",
                "none"
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
        "VerifiablePresentationResponseOpts": {
            "type": "object",
            "properties": {
                "format": {
                    "$ref": "#/definitions/VerifiablePresentationTypeFormat"
                },
                "presentation": {
                    "$ref": "#/definitions/IPresentation"
                },
                "location": {
                    "$ref": "#/definitions/PresentationLocation"
                }
            },
            "required": [
                "format",
                "location",
                "presentation"
            ],
            "additionalProperties": false
        },
        "VerifiablePresentationTypeFormat": {
            "type": "string",
            "enum": [
                "jwt_vp",
                "ldp_vp"
            ]
        },
        "IPresentation": {
            "type": "object",
            "properties": {
                "@context": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "type": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "verifiableCredential": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/IVerifiableCredential"
                    }
                },
                "presentation_submission": {
                    "$ref": "#/definitions/PresentationSubmission"
                },
                "holder": {
                    "type": "string"
                }
            },
            "required": [
                "@context",
                "type",
                "verifiableCredential"
            ],
            "additionalProperties": false
        },
        "IVerifiableCredential": {
            "anyOf": [
                {
                    "$ref": "#/definitions/IJwtVerifiableCredential"
                },
                {
                    "$ref": "#/definitions/IJsonLdVerifiableCredential"
                }
            ]
        },
        "IJwtVerifiableCredential": {
            "type": "object",
            "properties": {
                "proof": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IProof"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/IProof"
                            }
                        }
                    ]
                },
                "aud": {
                    "type": "string"
                },
                "exp": {
                    "type": [
                        "string",
                        "number"
                    ]
                },
                "iss": {
                    "type": "string"
                },
                "jti": {
                    "type": "string"
                },
                "nbf": {
                    "type": [
                        "string",
                        "number"
                    ]
                },
                "sub": {
                    "type": "string"
                },
                "vc": {
                    "$ref": "#/definitions/BaseCredential"
                }
            },
            "required": [
                "iss",
                "proof",
                "vc"
            ]
        },
        "IProof": {
            "type": "object",
            "properties": {
                "type": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/ProofType"
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "created": {
                    "type": "string"
                },
                "proofPurpose": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/ProofPurpose"
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "verificationMethod": {
                    "type": "string"
                },
                "challenge": {
                    "type": "string"
                },
                "domain": {
                    "type": "string"
                },
                "proofValue": {
                    "type": "string"
                },
                "jws": {
                    "type": "string"
                },
                "nonce": {
                    "type": "string"
                },
                "requiredRevealStatements": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "type",
                "created",
                "proofPurpose",
                "verificationMethod"
            ],
            "additionalProperties": {
                "anyOf": [
                    {
                        "type": "string"
                    },
                    {
                        "type": "array",
                        "items": {
                            "type": "string"
                        }
                    },
                    {
                        "not": {}
                    }
                ]
            }
        },
        "ProofType": {
            "type": "string",
            "enum": [
                "Ed25519Signature2018",
                "Ed25519Signature2020",
                "EcdsaSecp256k1Signature2019",
                "EcdsaSecp256k1RecoverySignature2020",
                "JsonWebSignature2020",
                "RsaSignature2018",
                "GpgSignature2020",
                "JcsEd25519Signature2020",
                "BbsBlsSignatureProof2020",
                "BbsBlsBoundSignatureProof2020"
            ]
        },
        "ProofPurpose": {
            "type": "string",
            "enum": [
                "assertionMethod",
                "authentication",
                "keyAgreement",
                "contactAgreement",
                "capabilityInvocation",
                "capabilityDelegation"
            ]
        },
        "BaseCredential": {
            "type": "object",
            "properties": {
                "@context": {
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
                "credentialStatus": {
                    "$ref": "#/definitions/ICredentialStatus"
                },
                "credentialSubject": {
                    "$ref": "#/definitions/ICredentialSubject"
                },
                "credentialSchema": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/ICredentialSchema"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/ICredentialSchema"
                            }
                        }
                    ]
                },
                "description": {
                    "type": "string"
                },
                "expirationDate": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "issuanceDate": {
                    "type": "string"
                },
                "issuer": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/IIssuer"
                        }
                    ]
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "@context",
                "credentialSubject",
                "id",
                "issuanceDate",
                "issuer",
                "type"
            ],
            "additionalProperties": {
                "anyOf": [
                    {},
                    {}
                ]
            }
        },
        "ICredentialStatus": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "type"
            ],
            "additionalProperties": false
        },
        "ICredentialSubject": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                }
            },
            "additionalProperties": {}
        },
        "ICredentialSchema": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "type"
            ],
            "additionalProperties": false
        },
        "IIssuer": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "id"
            ],
            "additionalProperties": {}
        },
        "IJsonLdVerifiableCredential": {
            "type": "object",
            "properties": {
                "proof": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IProof"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/IProof"
                            }
                        }
                    ]
                },
                "@context": {
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
                "credentialStatus": {
                    "$ref": "#/definitions/ICredentialStatus"
                },
                "credentialSubject": {
                    "$ref": "#/definitions/ICredentialSubject"
                },
                "credentialSchema": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/ICredentialSchema"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/ICredentialSchema"
                            }
                        }
                    ]
                },
                "description": {
                    "type": "string"
                },
                "expirationDate": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "issuanceDate": {
                    "type": "string"
                },
                "issuer": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {
                            "$ref": "#/definitions/IIssuer"
                        }
                    ]
                },
                "name": {
                    "type": "string"
                },
                "type": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "@context",
                "credentialSubject",
                "id",
                "issuanceDate",
                "issuer",
                "proof",
                "type"
            ]
        },
        "PresentationSubmission": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "definition_id": {
                    "type": "string"
                },
                "descriptor_map": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Descriptor"
                    }
                }
            },
            "required": [
                "id",
                "definition_id",
                "descriptor_map"
            ],
            "additionalProperties": false
        },
        "Descriptor": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "path": {
                    "type": "string"
                },
                "path_nested": {
                    "$ref": "#/definitions/Descriptor"
                },
                "format": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "path",
                "format"
            ],
            "additionalProperties": false
        },
        "PresentationLocation": {
            "type": "string",
            "enum": [
                "vp_token",
                "id_token"
            ]
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb25SZXNwb25zZU9wdHMuc2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4vc2NoZW1hcy9BdXRoZW50aWNhdGlvblJlc3BvbnNlT3B0cy5zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxnQ0FBZ0MsR0FBRztJQUM5QyxTQUFTLEVBQUUseUNBQXlDO0lBQ3BELE1BQU0sRUFBRSwwQ0FBMEM7SUFDbEQsYUFBYSxFQUFFO1FBQ2IsNEJBQTRCLEVBQUU7WUFDNUIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsWUFBWSxFQUFFO2dCQUNaLGFBQWEsRUFBRTtvQkFDYixNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsZUFBZSxFQUFFO29CQUNmLE9BQU8sRUFBRTt3QkFDUDs0QkFDRSxNQUFNLEVBQUUsaUNBQWlDO3lCQUMxQzt3QkFDRDs0QkFDRSxNQUFNLEVBQUUsaUNBQWlDO3lCQUMxQzt3QkFDRDs0QkFDRSxNQUFNLEVBQUUsaUNBQWlDO3lCQUMxQztxQkFDRjtpQkFDRjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLE1BQU0sRUFBRSx3Q0FBd0M7aUJBQ2pEO2dCQUNELGNBQWMsRUFBRTtvQkFDZCxNQUFNLEVBQUUsNEJBQTRCO2lCQUNyQztnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELElBQUksRUFBRTtvQkFDSixNQUFNLEVBQUUsT0FBTztvQkFDZixPQUFPLEVBQUU7d0JBQ1AsTUFBTSxFQUFFLGtEQUFrRDtxQkFDM0Q7aUJBQ0Y7Z0JBQ0QsV0FBVyxFQUFFO29CQUNYLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjthQUNGO1lBQ0QsVUFBVSxFQUFFO2dCQUNWLGVBQWU7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