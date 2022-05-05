export declare const AuthenticationRequestOptsSchema: {
    $schema: string;
    $ref: string;
    definitions: {
        AuthenticationRequestOpts: {
            type: string;
            properties: {
                redirectUri: {
                    type: string;
                };
                requestBy: {
                    $ref: string;
                };
                signatureType: {
                    anyOf: {
                        $ref: string;
                    }[];
                };
                responseMode: {
                    $ref: string;
                };
                responseContext: {
                    $ref: string;
                };
                claims: {
                    $ref: string;
                };
                registration: {
                    $ref: string;
                };
                nonce: {
                    type: string;
                };
                state: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ObjectBy: {
            type: string;
            properties: {
                type: {
                    type: string;
                    enum: string[];
                };
                referenceUri: {
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
        NoSignature: {
            type: string;
            properties: {
                hexPublicKey: {
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
        ResponseMode: {
            type: string;
            enum: string[];
        };
        ResponseContext: {
            type: string;
            enum: string[];
        };
        ClaimOpts: {
            type: string;
            properties: {
                presentationDefinitions: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
        PresentationDefinitionWithLocation: {
            type: string;
            properties: {
                location: {
                    $ref: string;
                };
                definition: {
                    anyOf: {
                        $ref: string;
                    }[];
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        PresentationLocation: {
            type: string;
            enum: string[];
        };
        PresentationDefinitionV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                format: {
                    $ref: string;
                };
                submission_requirements: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                input_descriptors: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Format: {
            type: string;
            properties: {
                jwt: {
                    $ref: string;
                };
                jwt_vc: {
                    $ref: string;
                };
                jwt_vp: {
                    $ref: string;
                };
                ldp: {
                    $ref: string;
                };
                ldp_vc: {
                    $ref: string;
                };
                ldp_vp: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        JwtObject: {
            type: string;
            properties: {
                alg: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        LdpObject: {
            type: string;
            properties: {
                proof_type: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        SubmissionRequirement: {
            type: string;
            properties: {
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                rule: {
                    $ref: string;
                };
                count: {
                    type: string;
                };
                min: {
                    type: string;
                };
                max: {
                    type: string;
                };
                from: {
                    type: string;
                };
                from_nested: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Rules: {
            type: string;
            enum: string[];
        };
        InputDescriptorV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                group: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                schema: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                constraints: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Schema: {
            type: string;
            properties: {
                uri: {
                    type: string;
                };
                required: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ConstraintsV1: {
            type: string;
            properties: {
                limit_disclosure: {
                    $ref: string;
                };
                statuses: {
                    $ref: string;
                };
                fields: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                subject_is_issuer: {
                    $ref: string;
                };
                is_holder: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                same_subject: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
        Optionality: {
            type: string;
            enum: string[];
        };
        Statuses: {
            type: string;
            properties: {
                active: {
                    $ref: string;
                };
                suspended: {
                    $ref: string;
                };
                revoked: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        PdStatus: {
            type: string;
            properties: {
                directive: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        Directives: {
            type: string;
            enum: string[];
        };
        FieldV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                path: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                purpose: {
                    type: string;
                };
                filter: {
                    $ref: string;
                };
                predicate: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        FilterV1: {
            type: string;
            properties: {
                _const: {
                    type: string[];
                };
                _enum: {
                    type: string;
                    items: {
                        type: string[];
                    };
                };
                exclusiveMinimum: {
                    type: string[];
                };
                exclusiveMaximum: {
                    type: string[];
                };
                format: {
                    type: string;
                };
                minLength: {
                    type: string;
                };
                maxLength: {
                    type: string;
                };
                minimum: {
                    type: string[];
                };
                maximum: {
                    type: string[];
                };
                not: {
                    type: string;
                };
                pattern: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        HolderSubject: {
            type: string;
            properties: {
                field_id: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                directive: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        PresentationDefinitionV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                format: {
                    $ref: string;
                };
                submission_requirements: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                input_descriptors: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                frame: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        InputDescriptorV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                group: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                constraints: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ConstraintsV2: {
            type: string;
            properties: {
                limit_disclosure: {
                    $ref: string;
                };
                statuses: {
                    $ref: string;
                };
                fields: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                subject_is_issuer: {
                    $ref: string;
                };
                is_holder: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                same_subject: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
        FieldV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                path: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                purpose: {
                    type: string;
                };
                filter: {
                    $ref: string;
                };
                predicate: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        FilterV2: {
            type: string;
            properties: {
                _const: {
                    type: string[];
                };
                _enum: {
                    type: string;
                    items: {
                        type: string[];
                    };
                };
                exclusiveMinimum: {
                    type: string[];
                };
                exclusiveMaximum: {
                    type: string[];
                };
                format: {
                    type: string;
                };
                formatMaximum: {
                    type: string;
                };
                formatMinimum: {
                    type: string;
                };
                formatExclusiveMaximum: {
                    type: string;
                };
                formatExclusiveMinimum: {
                    type: string;
                };
                minLength: {
                    type: string;
                };
                maxLength: {
                    type: string;
                };
                minimum: {
                    type: string[];
                };
                maximum: {
                    type: string[];
                };
                not: {
                    type: string;
                };
                pattern: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        RequestRegistrationOpts: {
            type: string;
            properties: {
                subjectIdentifiersSupported: {
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
                registrationBy: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        SubjectIdentifierType: {
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
    };
};
