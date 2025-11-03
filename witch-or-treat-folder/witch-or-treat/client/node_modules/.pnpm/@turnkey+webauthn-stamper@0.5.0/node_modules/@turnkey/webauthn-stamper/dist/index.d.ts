/// <reference lib="dom" />
export type TWebauthnStamperConfig = {
    rpId: string;
    timeout?: number;
    userVerification?: UserVerificationRequirement;
    allowCredentials?: PublicKeyCredentialDescriptor[];
};
/**
 * Stamper to use with `@turnkey/http`'s `TurnkeyClient`
 */
export declare class WebauthnStamper {
    rpId: string;
    timeout: number;
    userVerification: UserVerificationRequirement;
    allowCredentials: PublicKeyCredentialDescriptor[];
    constructor(config: TWebauthnStamperConfig);
    stamp(payload: string): Promise<{
        stampHeaderName: string;
        stampHeaderValue: string;
    }>;
}
//# sourceMappingURL=index.d.ts.map