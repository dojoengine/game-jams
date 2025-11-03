class WalletStamperError extends Error {
    constructor(message, originalError = null) {
        super(`${message}${originalError ? ` - error: ${originalError.message}` : ""}`);
        this.originalError = originalError;
        this.name = "WalletStamperError";
    }
}

export { WalletStamperError };
//# sourceMappingURL=errors.mjs.map
