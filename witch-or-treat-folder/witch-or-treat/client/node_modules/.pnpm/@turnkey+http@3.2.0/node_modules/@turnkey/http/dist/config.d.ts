type TConfig = {
    /**
     * Turnkey API public key
     */
    apiPublicKey: string;
    /**
     * Turnkey API private key
     */
    apiPrivateKey: string;
    /**
     * Turnkey API base URL
     */
    baseUrl: string;
};
type TBrowserConfig = {
    /**
     * Turnkey API base URL
     */
    baseUrl: string;
};
/**
 * @deprecated use {@link TurnkeyClient} instead, which doesn't rely on global initialization logic.
 */
export declare function browserInit(value: TBrowserConfig): void;
/**
 * @deprecated use {@link TurnkeyClient} instead, which doesn't rely on global initialization logic.
 */
export declare function init(value: TConfig): void;
export declare function getConfig(): TConfig;
export declare function getBrowserConfig(): TBrowserConfig;
export {};
//# sourceMappingURL=config.d.ts.map