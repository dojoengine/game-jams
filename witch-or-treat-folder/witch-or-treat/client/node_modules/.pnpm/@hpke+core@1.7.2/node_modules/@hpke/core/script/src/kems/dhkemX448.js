(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpke/common", "./dhkemPrimitives/x448.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DhkemX448HkdfSha512 = void 0;
    const common_1 = require("@hpke/common");
    const x448_js_1 = require("./dhkemPrimitives/x448.js");
    /**
     * The DHKEM(X448, HKDF-SHA512) for HPKE KEM implementing {@link KemInterface}.
     *
     * The instance of this class can be specified to the
     * {@link https://jsr.io/@hpke/core/doc/~/CipherSuiteParams | CipherSuiteParams} as follows:
     *
     * @example
     *
     * ```ts
     * import {
     *   Aes256Gcm,
     *   CipherSuite,
     *   HkdfSha512,
     *   DhkemX448HkdfSha512,
     * } from "@hpke/core";
     *
     * const suite = new CipherSuite({
     *   kem: new DhkemX448HkdfSha512(),
     *   kdf: new HkdfSha512(),
     *   aead: new Aes256Gcm(),
     * });
     * ```
     */
    class DhkemX448HkdfSha512 extends common_1.Dhkem {
        constructor() {
            const kdf = new common_1.HkdfSha512Native();
            super(common_1.KemId.DhkemX448HkdfSha512, new x448_js_1.X448(kdf), kdf);
            /** KemId.DhkemX448HkdfSha512 (0x0021) */
            Object.defineProperty(this, "id", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: common_1.KemId.DhkemX448HkdfSha512
            });
            /** 64 */
            Object.defineProperty(this, "secretSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 64
            });
            /** 56 */
            Object.defineProperty(this, "encSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 56
            });
            /** 56 */
            Object.defineProperty(this, "publicKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 56
            });
            /** 56 */
            Object.defineProperty(this, "privateKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 56
            });
        }
    }
    exports.DhkemX448HkdfSha512 = DhkemX448HkdfSha512;
});
