import type { definitions } from "./__generated__/services/coordinator/public/v1/public_api.types";
type TAttestation = definitions["v1Attestation"];
type ExternalAuthenticatorTransports = AuthenticatorTransport | "hybrid";
type InternalAuthenticatorTransports = definitions["v1AuthenticatorTransport"];
export type TurnkeyPublicKeyCredentialRequestOptions = {
    timeout?: number;
    rpId?: string;
    allowCredentials?: PublicKeyCredentialDescriptor[];
    userVerification?: UserVerificationRequirement;
    extensions?: AuthenticationExtensionsClientInputs;
};
export type TurnkeyCredentialRequestOptions = {
    mediation?: CredentialMediationRequirement;
    publicKey: TurnkeyPublicKeyCredentialRequestOptions;
    signal?: AbortSignal;
    password?: boolean;
    unmediated?: boolean;
};
type TurnkeyCredentialCreationOptions = CredentialCreationOptions;
export type { TurnkeyCredentialCreationOptions };
export declare function protocolTransportEnumToInternalEnum(protocolEnum: ExternalAuthenticatorTransports): InternalAuthenticatorTransports;
export declare function getWebAuthnAssertion(payload: string, options?: TurnkeyCredentialRequestOptions): Promise<string>;
export declare function getWebAuthnAttestation(options: TurnkeyCredentialCreationOptions): Promise<TAttestation>;
//# sourceMappingURL=webauthn.d.ts.map