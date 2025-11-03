(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpke/common"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExportOnly = void 0;
    const common_1 = require("@hpke/common");
    /**
     * The ExportOnly mode for HPKE AEAD implementing {@link AeadInterface}.
     *
     * When using `@hpke/core`, the instance of this class must be specified
     * to the `aead` parameter of {@link CipherSuiteParams} instead of `AeadId.ExportOnly`
     * as follows:
     *
     * @example
     *
     * ```ts
     * import {
     *   CipherSuite,
     *   DhkemP256HkdfSha256,
     *   ExportOnly,
     *   HkdfSha256,
     * } from "@hpke/core";
     *
     * const suite = new CipherSuite({
     *   kem: new DhkemP256HkdfSha256(),
     *   kdf: new HkdfSha256(),
     *   aead: new ExportOnly(),
     * });
     * ```
     */
    class ExportOnly {
        constructor() {
            Object.defineProperty(this, "id", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: common_1.AeadId.ExportOnly
            });
            Object.defineProperty(this, "keySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 0
            });
            Object.defineProperty(this, "nonceSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 0
            });
            Object.defineProperty(this, "tagSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 0
            });
        }
        createEncryptionContext(_key) {
            throw new common_1.NotSupportedError("Export only");
        }
    }
    exports.ExportOnly = ExportOnly;
});
