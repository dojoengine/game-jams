/**
 * Converts a Turnkey API key pair into a JSON Web Key (JWK) format.
 * This function accepts P-256 API keys only.
 *
 * @param {Object} input - The Turnkey API key components.
 * @param {string} input.uncompressedPrivateKeyHex - Hexadecimal-encoded uncompressed private key (32-byte scalar).
 * @param {string} input.compressedPublicKeyHex - Hexadecimal-encoded compressed public key (33 bytes).
 * @returns {JsonWebKey} A JSON Web Key object representing the EC P-256 key.
 */
export declare function convertTurnkeyApiKeyToJwk(input: {
    uncompressedPrivateKeyHex: string;
    compressedPublicKeyHex: string;
}): JsonWebKey;
//# sourceMappingURL=utils.d.ts.map