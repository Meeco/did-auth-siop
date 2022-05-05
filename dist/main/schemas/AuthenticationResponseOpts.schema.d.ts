export declare const AuthenticationResponseOptsSchema: {
    $schema: string;
    $ref: string;
    definitions: {
        AuthenticationResponseOpts: {
            type: string;
            properties: {
                redirectUri: {
                    type: string;
                };
                signatureType: {
                    anyOf: {
                        $ref: string;
                    }[];
                };
                nonce: {
                    type: string;
                };
                state: {
                    type: string;
                };
                registration: {
                    $ref: string;
                };
                responseMode: {
                    $ref: string;
                };
                did: {
                    type: string;
                };
                vp: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                expiresIn: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        InternalSignature: {
            type: string;
            properties: {
                hexPrivateKey: {
                    type: string;
                };
                did: {
                    type: string;
                };
                kid: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ExternalSignature: {
            type: string;
            properties: {
                signatureUri: {
                    type: string;
                };
                did: {
                    type: string;
                };
                authZToken: {
                    type: string;
                };
                hexPublicKey: {
                    type: string;
                };
                kid: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        SuppliedSignature: {
            type: string;
            properties: {
                did: {
                    type: string;
                };
                kid: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ResponseRegistrationOpts: {
            type: string;
            properties: {
                authorizationEndpoint: {
                    type: string;
                };
                scopesSupported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                subjectTypesSupported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                idTokenSigningAlgValuesSupported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                requestObjectSigningAlgValuesSupported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                didsSupported: {
                    type: string;
                };
                didMethodsSupported: {
                    anyOf: ({
                        type: string;
                        items: {
                            type: string;
                        };
                    } | {
                        type: string;
                        items?: undefined;
                    })[];
                };
                credentialSupported: {
                    type: string;
                };
                credentialEndpoint: {
                    type: string;
                };
                credentialFormatsSupported: {
                    anyOf: ({
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    })[];
                };
                credentialClaimsSupported: {
                    anyOf: ({
                        type: string;
                        items: {
                            type: string;
                        };
                    } | {
                        type: string;
                        items?: undefined;
                    })[];
                };
                credentialName: {
                    type: string;
                };
                registrationBy: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Scope: {
            type: string;
            enum: string[];
        };
        SubjectType: {
            type: string;
            enum: string[];
        };
        KeyAlgo: {
            type: string;
            enum: string[];
        };
        SigningAlgo: {
            type: string;
            enum: string[];
        };
        CredentialFormat: {
            type: string;
            enum: string[];
        };
        RegistrationType: {
            type: string;
            properties: {
                type: {
                    type: string;
                    enum: string[];
                };
                referenceUri: {
                    type: string;
                };
                id_token_encrypted_response_alg: {
                    $ref: string;
                };
                id_token_encrypted_response_enc: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
            required: string[];
        };
        EncKeyAlgorithm: {
            type: string;
            const: string;
        };
        EncSymmetricAlgorithmCode: {
            type: string;
            const: string;
        };
        ResponseMode: {
            type: string;
            enum: string[];
        };
        VerifiablePresentationResponseOpts: {
            type: string;
            properties: {
                format: {
                    $ref: string;
                };
                presentation: {
                    $ref: string;
                };
                location: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        VerifiablePresentationTypeFormat: {
            type: string;
            enum: string[];
        };
        IPresentation: {
            type: string;
            properties: {
                "@context": {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                type: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                verifiableCredential: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                presentation_submission: {
                    $ref: string;
                };
                holder: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        IVerifiableCredential: {
            anyOf: {
                $ref: string;
            }[];
        };
        IJwtVerifiableCredential: {
            type: string;
            properties: {
                proof: {
                    anyOf: ({
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    })[];
                };
                aud: {
                    type: string;
                };
                exp: {
                    type: string[];
                };
                iss: {
                    type: string;
                };
                jti: {
                    type: string;
                };
                nbf: {
                    type: string[];
                };
                sub: {
                    type: string;
                };
                vc: {
                    $ref: string;
                };
            };
            required: string[];
        };
        IProof: {
            type: string;
            properties: {
                type: {
                    anyOf: ({
                        $ref: string;
                        type?: undefined;
                    } | {
                        type: string;
                        $ref?: undefined;
                    })[];
                };
                created: {
                    type: string;
                };
                proofPurpose: {
                    anyOf: ({
                        $ref: string;
                        type?: undefined;
                    } | {
                        type: string;
                        $ref?: undefined;
                    })[];
                };
                verificationMethod: {
                    type: string;
                };
                challenge: {
                    type: string;
                };
                domain: {
                    type: string;
                };
                proofValue: {
                    type: string;
                };
                jws: {
                    type: string;
                };
                nonce: {
                    type: string;
                };
                requiredRevealStatements: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: {
                anyOf: ({
                    type: string;
                    items?: undefined;
                    not?: undefined;
                } | {
                    type: string;
                    items: {
                        type: string;
                    };
                    not?: undefined;
                } | {
                    not: {};
                    type?: undefined;
                    items?: undefined;
                })[];
            };
        };
        ProofType: {
            type: string;
            enum: string[];
        };
        ProofPurpose: {
            type: string;
            enum: string[];
        };
        BaseCredential: {
            type: string;
            properties: {
                "@context": {
                    anyOf: ({
                        type: string;
                        items: {
                            type: string;
                        };
                    } | {
                        type: string;
                        items?: undefined;
                    })[];
                };
                credentialStatus: {
                    $ref: string;
                };
                credentialSubject: {
                    $ref: string;
                };
                credentialSchema: {
                    anyOf: ({
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    })[];
                };
                description: {
                    type: string;
                };
                expirationDate: {
                    type: string;
                };
                id: {
                    type: string;
                };
                issuanceDate: {
                    type: string;
                };
                issuer: {
                    anyOf: ({
                        type: string;
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                    })[];
                };
                name: {
                    type: string;
                };
                type: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: {
                anyOf: {}[];
            };
        };
        ICredentialStatus: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ICredentialSubject: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
            };
            additionalProperties: {};
        };
        ICredentialSchema: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        IIssuer: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: {};
        };
        IJsonLdVerifiableCredential: {
            type: string;
            properties: {
                proof: {
                    anyOf: ({
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    })[];
                };
                "@context": {
                    anyOf: ({
                        type: string;
                        items: {
                            type: string;
                        };
                    } | {
                        type: string;
                        items?: undefined;
                    })[];
                };
                credentialStatus: {
                    $ref: string;
                };
                credentialSubject: {
                    $ref: string;
                };
                credentialSchema: {
                    anyOf: ({
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    })[];
                };
                description: {
                    type: string;
                };
                expirationDate: {
                    type: string;
                };
                id: {
                    type: string;
                };
                issuanceDate: {
                    type: string;
                };
                issuer: {
                    anyOf: ({
                        type: string;
                        $ref?: undefined;
                    } | {
                        $ref: string;
                        type?: undefined;
                    })[];
                };
                name: {
                    type: string;
                };
                type: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
        };
        PresentationSubmission: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                definition_id: {
                    type: string;
                };
                descriptor_map: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Descriptor: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                path: {
                    type: string;
                };
                path_nested: {
                    $ref: string;
                };
                format: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        PresentationLocation: {
            type: string;
            enum: string[];
        };
    };
};
