import { createRequestFromJSON as parseCreationOptionsFromJSON, getRequestFromJSON as parseRequestOptionsFromJSON } from "./api";
import type { CredentialCreationOptionsJSON, CredentialRequestOptionsJSON, PublicKeyCredentialWithAssertionJSON as AuthenticationResponseJSON, PublicKeyCredentialWithAttestationJSON as RegistrationResponseJSON } from "./json";
export type { PublicKeyCredentialWithAssertionJSON, PublicKeyCredentialWithAttestationJSON, } from "./json";
export { parseCreationOptionsFromJSON, parseRequestOptionsFromJSON };
export type { CredentialCreationOptionsJSON, CredentialRequestOptionsJSON, AuthenticationResponseJSON, RegistrationResponseJSON, };
export interface RegistrationPublicKeyCredential extends PublicKeyCredential {
    toJSON(): RegistrationResponseJSON;
}
export declare function create(options: CredentialCreationOptions): Promise<RegistrationPublicKeyCredential>;
export interface AuthenticationPublicKeyCredential extends PublicKeyCredential {
    toJSON(): AuthenticationResponseJSON;
}
export declare function get(options: CredentialRequestOptions): Promise<AuthenticationPublicKeyCredential>;
//# sourceMappingURL=index.d.ts.map