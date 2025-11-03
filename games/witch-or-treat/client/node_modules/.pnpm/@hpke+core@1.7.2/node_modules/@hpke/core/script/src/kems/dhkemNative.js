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
    exports.DhkemP521HkdfSha512Native = exports.DhkemP384HkdfSha384Native = exports.DhkemP256HkdfSha256Native = void 0;
    const common_1 = require("@hpke/common");
    class DhkemP256HkdfSha256Native extends common_1.Dhkem {
        constructor() {
            const kdf = new common_1.HkdfSha256Native();
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
    exports.DhkemP256HkdfSha256Native = DhkemP256HkdfSha256Native;
    class DhkemP384HkdfSha384Native extends common_1.Dhkem {
        constructor() {
            const kdf = new common_1.HkdfSha384Native();
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
    exports.DhkemP384HkdfSha384Native = DhkemP384HkdfSha384Native;
    class DhkemP521HkdfSha512Native extends common_1.Dhkem {
        constructor() {
            const kdf = new common_1.HkdfSha512Native();
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
    exports.DhkemP521HkdfSha512Native = DhkemP521HkdfSha512Native;
});
