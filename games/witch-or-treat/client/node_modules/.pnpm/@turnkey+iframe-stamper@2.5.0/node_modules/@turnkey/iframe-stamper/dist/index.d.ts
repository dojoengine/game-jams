/// <reference lib="dom" />
export declare enum IframeEventType {
    PublicKeyReady = "PUBLIC_KEY_READY",
    InjectCredentialBundle = "INJECT_CREDENTIAL_BUNDLE",
    InjectKeyExportBundle = "INJECT_KEY_EXPORT_BUNDLE",
    InjectWalletExportBundle = "INJECT_WALLET_EXPORT_BUNDLE",
    InjectImportBundle = "INJECT_IMPORT_BUNDLE",
    ExtractWalletEncryptedBundle = "EXTRACT_WALLET_ENCRYPTED_BUNDLE",
    ExtractKeyEncryptedBundle = "EXTRACT_KEY_ENCRYPTED_BUNDLE",
    ApplySettings = "APPLY_SETTINGS",
    BundleInjected = "BUNDLE_INJECTED",
    EncryptedBundleExtracted = "ENCRYPTED_BUNDLE_EXTRACTED",
    SettingsApplied = "SETTINGS_APPLIED",
    StampRequest = "STAMP_REQUEST",
    Stamp = "STAMP",
    TurnkeyInitMessageChannel = "TURNKEY_INIT_MESSAGE_CHANNEL",
    GetEmbeddedPublicKey = "GET_EMBEDDED_PUBLIC_KEY",
    ClearEmbeddedKey = "RESET_EMBEDDED_KEY",
    InitEmbeddedKey = "INIT_EMBEDDED_KEY",
    Error = "ERROR"
}
export declare enum KeyFormat {
    Hexadecimal = "HEXADECIMAL",
    Solana = "SOLANA"
}
type TStamp = {
    stampHeaderName: string;
    stampHeaderValue: string;
};
export type TIframeStamperConfig = {
    iframeUrl: string;
    iframeElementId: string;
    iframeContainer: HTMLElement | null | undefined;
};
export type TIframeStyles = {
    padding?: string;
    margin?: string;
    borderWidth?: string;
    borderStyle?: string;
    borderColor?: string;
    borderRadius?: string;
    fontSize?: string;
    fontWeight?: string;
    fontFamily?: string;
    color?: string;
    backgroundColor?: string;
    width?: string;
    height?: string;
    maxWidth?: string;
    maxHeight?: string;
    lineHeight?: string;
    boxShadow?: string;
    textAlign?: string;
    overflowWrap?: string;
    wordWrap?: string;
    resize?: string;
};
export type TIframeSettings = {
    styles?: TIframeStyles;
};
/**
 * Stamper to use with `@turnkey/http`'s `TurnkeyClient`
 * Creating a stamper inserts an iframe in the current page.
 */
export declare class IframeStamper {
    container: HTMLElement;
    iframe: HTMLIFrameElement;
    iframeOrigin: string;
    iframePublicKey: string | null;
    messageChannel: MessageChannel;
    private pendingRequests;
    /**
     * Creates a new iframe stamper. This function _does not_ insert the iframe in the DOM.
     * Call `.init()` to insert the iframe element in the DOM.
     */
    constructor(config: TIframeStamperConfig);
    onMessageHandler(event: MessageEvent): void;
    /**
     * Inserts the iframe on the page and returns a promise resolving to the iframe's public key
     * @param dangerouslyOverrideIframeKeyTtl Optional TTL override for the iframe's embedded key (default 48 hours). Only use this if you are intentional about the security implications.
     */
    init(dangerouslyOverrideIframeKeyTtl?: number | undefined): Promise<string>;
    /**
     * Removes the iframe from the DOM
     */
    clear(): void;
    /**
     * Returns the public key, or `null` if the underlying iframe isn't properly initialized.
     */
    publicKey(): string | null;
    /**
     * Returns the public key, or `null` if the underlying iframe isn't properly initialized.
     * This differs from the above in that it reaches out to the live iframe to see if an embedded key exists.
     */
    getEmbeddedPublicKey(): Promise<string | null>;
    /**
     * Clears the embedded key within an iframe.
     */
    clearEmbeddedKey(): Promise<null>;
    /**
     * Creates a new embedded key within an iframe. If an embedded key already exists, this will return it.
     * This is primarily to be used in conjunction with `clearEmbeddedKey()`: after an embedded key is cleared,
     * this can be used to create a new one.
     * @return {string | null} the newly created embedded public key.
     */
    initEmbeddedKey(): Promise<string | null>;
    /**
     * Generic function to abstract away request creation
     * @param type
     * @param payload
     * @returns expected shape <T>
     */
    private createRequest;
    /**
     * Function to inject a new credential into the iframe
     * The bundle should be encrypted to the iframe's initial public key
     * Encryption should be performed with HPKE (RFC 9180).
     * This is used during recovery and auth flows.
     */
    injectCredentialBundle(bundle: string): Promise<boolean>;
    /**
     * Function to inject an export bundle into the iframe
     * The bundle should be encrypted to the iframe's initial public key
     * Encryption should be performed with HPKE (RFC 9180).
     * The key format to encode the private key in after it's exported and decrypted: HEXADECIMAL or SOLANA. Defaults to HEXADECIMAL.
     * This is used during the private key export flow.
     */
    injectKeyExportBundle(bundle: string, organizationId: string, keyFormat?: KeyFormat): Promise<boolean>;
    /**
     * Function to inject an export bundle into the iframe
     * The bundle should be encrypted to the iframe's initial public key
     * Encryption should be performed with HPKE (RFC 9180).
     * This is used during the wallet export flow.
     */
    injectWalletExportBundle(bundle: string, organizationId: string): Promise<boolean>;
    /**
     * Function to inject an import bundle into the iframe
     * This is used to initiate either the wallet import flow or the private key import flow.
     */
    injectImportBundle(bundle: string, organizationId: string, userId: string): Promise<boolean>;
    /**
     * Function to extract an encrypted bundle from the iframe
     * The bundle should be encrypted to Turnkey's Signer enclave's initial public key
     * Encryption should be performed with HPKE (RFC 9180).
     * This is used during the wallet import flow.
     */
    extractWalletEncryptedBundle(): Promise<string>;
    /**
     * Function to extract an encrypted bundle from the iframe
     * The bundle should be encrypted to Turnkey's Signer enclave's initial public key
     * Encryption should be performed with HPKE (RFC 9180).
     * The key format to encode the private key in before it's encrypted and imported: HEXADECIMAL or SOLANA. Defaults to HEXADECIMAL.
     * This is used during the private key import flow.
     */
    extractKeyEncryptedBundle(keyFormat?: KeyFormat): Promise<string>;
    /**
     * Function to apply settings on allowed parameters in the iframe
     * This is used to style the HTML element used for plaintext in wallet and private key import.
     */
    applySettings(settings: TIframeSettings): Promise<boolean>;
    /**
     * Function to sign a payload with the underlying iframe
     */
    stamp(payload: string): Promise<TStamp>;
}
export {};
//# sourceMappingURL=index.d.ts.map