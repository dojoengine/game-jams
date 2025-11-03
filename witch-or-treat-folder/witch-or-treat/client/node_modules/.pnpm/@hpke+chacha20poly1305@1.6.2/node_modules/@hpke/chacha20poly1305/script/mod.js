(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./src/chacha20Poly1305.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Chacha20Poly1305 = void 0;
    var chacha20Poly1305_js_1 = require("./src/chacha20Poly1305.js");
    Object.defineProperty(exports, "Chacha20Poly1305", { enumerable: true, get: function () { return chacha20Poly1305_js_1.Chacha20Poly1305; } });
});
