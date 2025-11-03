(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpke/common", "@hpke/dhkem-x25519"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DhkemP256HkdfSha256 = void 0;
    const common_1 = require("@hpke/common");
    const dhkem_x25519_1 = require("@hpke/dhkem-x25519");
    class DhkemP256HkdfSha256 extends common_1.Dhkem {
        constructor() {
            const kdf = new dhkem_x25519_1.HkdfSha256();
            const prim = new common_1.Ec(common_1.KemId.DhkemP256HkdfSha256, kdf);
            super(common_1.KemId.DhkemP256HkdfSha256, prim, kdf);
            Object.defineProperty(this, "id", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: common_1.KemId.DhkemP256HkdfSha256
            });
            Object.defineProperty(this, "secretSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 32
            });
            Object.defineProperty(this, "encSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 65
            });
            Object.defineProperty(this, "publicKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 65
            });
            Object.defineProperty(this, "privateKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 32
            });
        }
    }
    exports.DhkemP256HkdfSha256 = DhkemP256HkdfSha256;
});
