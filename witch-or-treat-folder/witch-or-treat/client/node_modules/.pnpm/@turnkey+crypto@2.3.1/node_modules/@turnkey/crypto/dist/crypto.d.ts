/// <reference lib="dom" />
interface HpkeDecryptParams {
    ciphertextBuf: Uint8Array;
    encappedKeyBuf: Uint8Array;
    receiverPriv: string;
}
interface HpkeEncryptParams {
    plainTextBuf: Uint8Array;
    targetKeyBuf: Uint8Array;
}
interface HpkeAuthEncryptParams {
    plainTextBuf: Uint8Array;
    targetKeyBuf: Uint8Array;
    senderPriv: string;
}
interface KeyPair {
    privateKey: string;
    publicKey: string;
    publicKeyUncompressed: string;
}
/**
 * Get PublicKey function
 * Derives public key from Uint8Array or hexstring private key
 *
 * @param {Uint8Array | string} privateKey - The Uint8Array or hexstring representation of a compressed private key.
 * @param {boolean} isCompressed - Specifies whether to return a compressed or uncompressed public key. Defaults to true.
 * @returns {Uint8Array} - The public key in Uin8Array representation.
 */
export declare const getPublicKey: (privateKey: Uint8Array | string, isCompressed?: boolean) => Uint8Array;
/**
 * HPKE Encrypt Function
 * Encrypts data using Hybrid Public Key Encryption (HPKE) standard https://datatracker.ietf.org/doc/rfc9180/.
 *
 * @param {HpkeEncryptParams} params - The encryption parameters including plain text, encapsulated key, and sender private key.
 * @returns {Uint8Array} - The encrypted data.
 */
export declare const hpkeEncrypt: ({ plainTextBuf, targetKeyBuf, }: HpkeEncryptParams) => Uint8Array;
/**
 * HPKE Encrypt Function
 * Encrypts data using Authenticated ,Hybrid Public Key Encryption (HPKE) standard https://datatracker.ietf.org/doc/rfc9180/.
 *
 * @param {HpkeAuthEncryptParams} params - The encryption parameters including plain text, encapsulated key, and sender private key.
 * @returns {Uint8Array} - The encrypted data.
 */
export declare const hpkeAuthEncrypt: ({ plainTextBuf, targetKeyBuf, senderPriv, }: HpkeAuthEncryptParams) => Uint8Array;
/**
 * Format HPKE Buffer Function
 * Returns a JSON string of an encrypted bundle, separating out the cipher text and the sender public key
 *
 * @param {Uint8Array} encryptedBuf - The result of hpkeAuthEncrypt or hpkeEncrypt
 * @returns {string} - A JSON string with "encappedPublic" and "ciphertext"
 */
export declare const formatHpkeBuf: (encryptedBuf: Uint8Array) => string;
/**
 * HPKE Decrypt Function
 * Decrypts data using Hybrid Public Key Encryption (HPKE) standard https://datatracker.ietf.org/doc/rfc9180/.
 *
 * @param {HpkeDecryptParams} params - The decryption parameters including ciphertext, encapsulated key, and receiver private key.
 * @returns {Uint8Array} - The decrypted data.
 */
export declare const hpkeDecrypt: ({ ciphertextBuf, encappedKeyBuf, receiverPriv, }: HpkeDecryptParams) => Uint8Array;
/**
 * Generate a P-256 key pair. Contains the hexed privateKey, publicKey, and Uncompressed publicKey
 *
 * @returns {KeyPair} - The generated key pair.
 */
export declare const generateP256KeyPair: () => KeyPair;
/**
 * Create additional associated data (AAD) for AES-GCM decryption.
 *
 * @param {Uint8Array} senderPubBuf
 * @param {Uint8Array} receiverPubBuf
 * @return {Uint8Array} - The resulting concatenation of sender and receiver pubkeys.
 */
export declare const buildAdditionalAssociatedData: (senderPubBuf: Uint8Array, receiverPubBuf: Uint8Array) => Uint8Array;
/**
 * Accepts a private key Uint8Array in the PKCS8 format, and returns the encapsulated private key.
 *
 * @param {Uint8Array} privateKey - A PKCS#8 private key structured with the key data at a specific position. The actual key starts at byte 36 and is 32 bytes long.
 * @return {Uint8Array} - The private key.
 */
export declare const extractPrivateKeyFromPKCS8Bytes: (privateKey: Uint8Array) => Uint8Array;
/**
 * Accepts a public key Uint8Array, and returns a Uint8Array with the compressed version of the public key.
 *
 * @param {Uint8Array} rawPublicKey - The raw public key.
 * @return {Uint8Array} – The compressed public key.
 */
export declare const compressRawPublicKey: (rawPublicKey: Uint8Array) => Uint8Array;
/**
 * Accepts a public key array buffer, and returns a buffer with the uncompressed version of the public key
 * @param {Uint8Array} rawPublicKey - The public key.
 * @return {Uint8Array} - The uncompressed public key.
 */
export declare const uncompressRawPublicKey: (rawPublicKey: Uint8Array) => Uint8Array;
/**
 * Converts an ASN.1 DER-encoded ECDSA signature to the raw format used for verification.
 *
 * @param {string} derSignature - The DER-encoded signature.
 * @returns {Uint8Array} - The raw signature.
 */
export declare const fromDerSignature: (derSignature: string) => Uint8Array;
/**
 * Converts a raw ECDSA signature to DER-encoded format.
 *
 * This function takes a raw ECDSA signature, which is a concatenation of two 32-byte integers (r and s),
 * and converts it into the DER-encoded format. DER (Distinguished Encoding Rules) is a binary encoding
 * for data structures described by ASN.1.
 *
 * @param {string} rawSignature - The raw signature in hexadecimal string format.
 * @returns {string} - The DER-encoded signature in hexadecimal string format.
 *
 * @throws {Error} - Throws an error if the input signature is invalid or if the encoding process fails.
 *
 * @example
 * // Example usage:
 * const rawSignature = "0x487cdb8a88f2f4044b701cbb116075c4cabe5fe4657a6358b395c0aab70694db3453a8057e442bd1aff0ecabe8a82c831f0edd7f2158b7c1feb3de9b1f20309b1c";
 * const derSignature = toDerSignature(rawSignature);
 * console.log(derSignature); // Outputs the DER-encoded signature as a hex string
 * // "30440220487cdb8a88f2f4044b701cbb116075c4cabe5fe4657a6358b395c0aab70694db02203453a8057e442bd1aff0ecabe8a82c831f0edd7f2158b7c1feb3de9b1f20309b"
 */
export declare const toDerSignature: (rawSignature: string) => string;
export {};
//# sourceMappingURL=crypto.d.ts.map