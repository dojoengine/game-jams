/**
 * The supported Key Encapsulation Mechanism (KEM) identifiers.
 *
 * @deprecated Use {@link KdfId} instead.
 */
export declare const Kem: {
    readonly NotAssigned: 0;
    readonly DhkemP256HkdfSha256: 16;
    readonly DhkemP384HkdfSha384: 17;
    readonly DhkemP521HkdfSha512: 18;
    readonly DhkemSecp256k1HkdfSha256: 19;
    readonly DhkemX25519HkdfSha256: 32;
    readonly DhkemX448HkdfSha512: 33;
    readonly HybridkemX25519Kyber768: 48;
};
/**
 * The type alias of the supported KEM identifiers.
 *
 * @deprecated Use {@link KdfId} instead.
 */
export type Kem = typeof Kem[keyof typeof Kem];
/**
 * The supported Key Derivation Function (KDF) identifiers.
 *
 * @deprecated Use {@link KdfId} instead.
 */
export declare const Kdf: {
    readonly HkdfSha256: 1;
    readonly HkdfSha384: 2;
    readonly HkdfSha512: 3;
};
/**
 * The type alias of the supported KDF identifiers.
 *
 * @deprecated Use {@link KdfId} instead.
 */
export type Kdf = typeof Kdf[keyof typeof Kdf];
/**
 * The supported Authenticated Encryption with Associated Data (AEAD) identifiers.
 *
 * @deprecated Use {@link AeadId} instead.
 */
export declare const Aead: {
    readonly Aes128Gcm: 1;
    readonly Aes256Gcm: 2;
    readonly Chacha20Poly1305: 3;
    readonly ExportOnly: 65535;
};
/**
 * The type alias of the supported AEAD identifiers.
 *
 * @deprecated Use {@link AeadId} instead.
 */
export type Aead = typeof Aead[keyof typeof Aead];
//# sourceMappingURL=identifiers.d.ts.map