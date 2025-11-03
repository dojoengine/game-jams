'use strict';

var elliptic_curves = require('./tink/elliptic_curves.js');
var encoding = require('@turnkey/encoding');

/**
 * Converts a Turnkey API key pair into a JSON Web Key (JWK) format.
 * This function accepts P-256 API keys only.
 *
 * @param {Object} input - The Turnkey API key components.
 * @param {string} input.uncompressedPrivateKeyHex - Hexadecimal-encoded uncompressed private key (32-byte scalar).
 * @param {string} input.compressedPublicKeyHex - Hexadecimal-encoded compressed public key (33 bytes).
 * @returns {JsonWebKey} A JSON Web Key object representing the EC P-256 key.
 */
function convertTurnkeyApiKeyToJwk(input) {
    const { uncompressedPrivateKeyHex, compressedPublicKeyHex } = input;
    let jwk;
    try {
        jwk = elliptic_curves.pointDecode(encoding.uint8ArrayFromHexString(compressedPublicKeyHex));
    }
    catch (e) {
        throw new Error(`unable to load API key: invalid public key. Did you switch your public and private key by accident? Is your public key a valid, compressed P-256 public key?`);
    }
    // Ensure that d is sufficiently padded
    jwk.d = encoding.hexStringToBase64url(uncompressedPrivateKeyHex, encoding.DEFAULT_JWK_MEMBER_BYTE_LENGTH);
    return jwk;
}

exports.convertTurnkeyApiKeyToJwk = convertTurnkeyApiKeyToJwk;
//# sourceMappingURL=utils.js.map
