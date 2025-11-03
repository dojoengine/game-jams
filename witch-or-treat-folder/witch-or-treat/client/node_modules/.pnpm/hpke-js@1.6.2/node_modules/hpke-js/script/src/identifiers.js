(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Aead = exports.Kdf = exports.Kem = void 0;
    /**
     * The supported Key Encapsulation Mechanism (KEM) identifiers.
     *
     * @deprecated Use {@link KdfId} instead.
     */
    exports.Kem = {
        NotAssigned: 0x0000,
        DhkemP256HkdfSha256: 0x0010,
        DhkemP384HkdfSha384: 0x0011,
        DhkemP521HkdfSha512: 0x0012,
        DhkemSecp256k1HkdfSha256: 0x0013,
        DhkemX25519HkdfSha256: 0x0020,
        DhkemX448HkdfSha512: 0x0021,
        HybridkemX25519Kyber768: 0x0030,
    };
    /**
     * The supported Key Derivation Function (KDF) identifiers.
     *
     * @deprecated Use {@link KdfId} instead.
     */
    exports.Kdf = {
        HkdfSha256: 0x0001,
        HkdfSha384: 0x0002,
        HkdfSha512: 0x0003,
    };
    /**
     * The supported Authenticated Encryption with Associated Data (AEAD) identifiers.
     *
     * @deprecated Use {@link AeadId} instead.
     */
    exports.Aead = {
        Aes128Gcm: 0x0001,
        Aes256Gcm: 0x0002,
        Chacha20Poly1305: 0x0003,
        ExportOnly: 0xFFFF,
    };
});
