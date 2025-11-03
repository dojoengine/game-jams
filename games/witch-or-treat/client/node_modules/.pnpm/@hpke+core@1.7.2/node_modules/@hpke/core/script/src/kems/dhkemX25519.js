(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpke/common", "./dhkemPrimitives/x25519.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DhkemX25519HkdfSha256 = void 0;
    const common_1 = require("@hpke/common");
    const x25519_js_1 = require("./dhkemPrimitives/x25519.js");
    /**
     * The DHKEM(X25519, HKDF-SHA256) for HPKE KEM implementing {@link KemInterface}.
     *
     * The instance of this class can be specified to the
     * {@link https://jsr.io/@hpke/core/doc/~/CipherSuiteParams | CipherSuiteParams} as follows:
     *
     * @example
     *
     * ```ts
     * import {
     *   Aes128Gcm,
     *   CipherSuite,
     *   HkdfSha256,
     *   DhkemX25519HkdfSha256,
     * } from "@hpke/core";
     *
     * const suite = new CipherSuite({
     *   kem: new DhkemX25519HkdfSha256(),
     *   kdf: new HkdfSha256(),
     *   aead: new Aes128Gcm(),
     * });
     * ```
     */
    class DhkemX25519HkdfSha256 extends common_1.Dhkem {
        constructor() {
            const kdf = new common_1.HkdfSha256Native();
            super(common_1.KemId.DhkemX25519HkdfSha256, new x25519_js_1.X25519(kdf), kdf);
            /** KemId.DhkemX25519HkdfSha256 (0x0020) */
            Object.defineProperty(this, "id", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: common_1.KemId.DhkemX25519HkdfSha256
            });
            /** 32 */
            Object.defineProperty(this, "secretSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 32
            });
            /** 32 */
            Object.defineProperty(this, "encSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 32
            });
            /** 32 */
            Object.defineProperty(this, "publicKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 32
            });
            /** 32 */
            Object.defineProperty(this, "privateKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 32
            });
        }
    }
    exports.DhkemX25519HkdfSha256 = DhkemX25519HkdfSha256;
});
