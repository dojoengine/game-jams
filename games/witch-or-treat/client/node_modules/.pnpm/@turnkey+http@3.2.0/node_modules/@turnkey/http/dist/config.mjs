const config = {
    apiPublicKey: null,
    apiPrivateKey: null,
    baseUrl: null,
};
const browserConfig = {
    baseUrl: null,
};
/**
 * @deprecated use {@link TurnkeyClient} instead, which doesn't rely on global initialization logic.
 */
function browserInit(value) {
    browserConfig.baseUrl = assertNonEmptyString(value.baseUrl, "baseUrl");
}
/**
 * @deprecated use {@link TurnkeyClient} instead, which doesn't rely on global initialization logic.
 */
function init(value) {
    config.apiPublicKey = assertNonEmptyString(value.apiPublicKey, "apiPublicKey");
    config.apiPrivateKey = assertNonEmptyString(value.apiPrivateKey, "apiPrivateKey");
    config.baseUrl = assertNonEmptyString(value.baseUrl, "baseUrl");
}
function getConfig() {
    return {
        apiPublicKey: assertNonEmptyString(config.apiPublicKey, "apiPublicKey"),
        apiPrivateKey: assertNonEmptyString(config.apiPrivateKey, "apiPrivateKey"),
        baseUrl: assertNonEmptyString(config.baseUrl, "baseUrl"),
    };
}
function getBrowserConfig() {
    return {
        baseUrl: assertNonEmptyString(browserConfig.baseUrl, "baseUrl"),
    };
}
function assertNonEmptyString(input, name) {
    if (typeof input !== "string" || !input) {
        throw new Error(`"${name}" must be a non-empty string`);
    }
    return input;
}

export { browserInit, getBrowserConfig, getConfig, init };
//# sourceMappingURL=config.mjs.map
