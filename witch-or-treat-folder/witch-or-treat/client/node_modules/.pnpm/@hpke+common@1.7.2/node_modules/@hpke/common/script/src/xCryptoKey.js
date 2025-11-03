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
    exports.XCryptoKey = void 0;
    class XCryptoKey {
        constructor(name, key, type, usages = []) {
            Object.defineProperty(this, "key", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "type", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "extractable", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: true
            });
            Object.defineProperty(this, "algorithm", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            Object.defineProperty(this, "usages", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: void 0
            });
            this.key = key;
            this.type = type;
            this.algorithm = { name: name };
            this.usages = usages;
            if (type === "public") {
                this.usages = [];
            }
        }
    }
    exports.XCryptoKey = XCryptoKey;
});
