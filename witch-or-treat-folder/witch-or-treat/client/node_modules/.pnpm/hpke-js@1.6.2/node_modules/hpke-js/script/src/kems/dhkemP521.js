(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpke/common", "@hpke/dhkem-x448"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DhkemP521HkdfSha512 = void 0;
    const common_1 = require("@hpke/common");
    const dhkem_x448_1 = require("@hpke/dhkem-x448");
    class DhkemP521HkdfSha512 extends common_1.Dhkem {
        constructor() {
            const kdf = new dhkem_x448_1.HkdfSha512();
            const prim = new common_1.Ec(common_1.KemId.DhkemP521HkdfSha512, kdf);
            super(common_1.KemId.DhkemP521HkdfSha512, prim, kdf);
            Object.defineProperty(this, "id", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: common_1.KemId.DhkemP521HkdfSha512
            });
            Object.defineProperty(this, "secretSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 64
            });
            Object.defineProperty(this, "encSize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 133
            });
            Object.defineProperty(this, "publicKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 133
            });
            Object.defineProperty(this, "privateKeySize", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: 64
            });
        }
    }
    exports.DhkemP521HkdfSha512 = DhkemP521HkdfSha512;
});
