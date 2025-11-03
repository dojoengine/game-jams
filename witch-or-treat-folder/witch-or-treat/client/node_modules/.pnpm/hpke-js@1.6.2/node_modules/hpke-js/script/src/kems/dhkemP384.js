(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpke/common", "../kdfs/hkdfSha384.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DhkemP384HkdfSha384 = void 0;
    const common_1 = require("@hpke/common");
    const hkdfSha384_js_1 = require("../kdfs/hkdfSha384.js");
    class DhkemP384HkdfSha384 extends common_1.Dhkem {
        constructor() {
            const kdf = new hkdfSha384_js_1.HkdfSha384();
            const prim = new common_1.Ec(common_1.KemId.DhkemP384HkdfSha384, kdf);
            super(common_1.KemId.DhkemP384HkdfSha384, prim, kdf);
            Object.defineProperty(this, "id", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: common_1.KemId.DhkemP384HkdfSha384
            });
            Object.defineProperty(this, "secretSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 48
            });
            Object.defineProperty(this, "encSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 97
            });
            Object.defineProperty(this, "publicKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 97
            });
            Object.defineProperty(this, "privateKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 48
            });
        }
    }
    exports.DhkemP384HkdfSha384 = DhkemP384HkdfSha384;
});
