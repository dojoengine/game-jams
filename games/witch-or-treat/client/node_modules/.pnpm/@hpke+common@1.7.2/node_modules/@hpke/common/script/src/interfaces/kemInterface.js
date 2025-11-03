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
    exports.SUITE_ID_HEADER_KEM = void 0;
    // b"KEM"
    exports.SUITE_ID_HEADER_KEM = new Uint8Array([
        75,
        69,
        77,
        0,
        0,
    ]);
});
