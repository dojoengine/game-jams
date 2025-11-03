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
    exports.LABEL_SK = exports.LABEL_DKP_PRK = exports.KEM_USAGES = void 0;
    // The key usages for KEM.
    exports.KEM_USAGES = ["deriveBits"];
    // b"dkp_prk"
    exports.LABEL_DKP_PRK = new Uint8Array([
        100,
        107,
        112,
        95,
        112,
        114,
        107,
    ]);
    // b"sk"
    exports.LABEL_SK = new Uint8Array([115, 107]);
});
