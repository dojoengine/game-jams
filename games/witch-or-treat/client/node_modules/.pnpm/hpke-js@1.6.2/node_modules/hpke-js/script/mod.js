(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpke/core", "./src/identifiers.js", "./src/cipherSuite.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CipherSuite = exports.Kem = exports.Kdf = exports.Aead = exports.ValidationError = exports.SerializeError = exports.SealError = exports.OpenError = exports.NotSupportedError = exports.MessageLimitReachedError = exports.KemId = exports.KdfId = exports.InvalidParamError = exports.HpkeError = exports.ExportError = exports.EncapError = exports.DeserializeError = exports.DeriveKeyPairError = exports.DecapError = exports.AeadId = void 0;
    var core_1 = require("@hpke/core");
    Object.defineProperty(exports, "AeadId", { enumerable: true, get: function () { return core_1.AeadId; } });
    Object.defineProperty(exports, "DecapError", { enumerable: true, get: function () { return core_1.DecapError; } });
    Object.defineProperty(exports, "DeriveKeyPairError", { enumerable: true, get: function () { return core_1.DeriveKeyPairError; } });
    Object.defineProperty(exports, "DeserializeError", { enumerable: true, get: function () { return core_1.DeserializeError; } });
    Object.defineProperty(exports, "EncapError", { enumerable: true, get: function () { return core_1.EncapError; } });
    Object.defineProperty(exports, "ExportError", { enumerable: true, get: function () { return core_1.ExportError; } });
    Object.defineProperty(exports, "HpkeError", { enumerable: true, get: function () { return core_1.HpkeError; } });
    Object.defineProperty(exports, "InvalidParamError", { enumerable: true, get: function () { return core_1.InvalidParamError; } });
    Object.defineProperty(exports, "KdfId", { enumerable: true, get: function () { return core_1.KdfId; } });
    Object.defineProperty(exports, "KemId", { enumerable: true, get: function () { return core_1.KemId; } });
    Object.defineProperty(exports, "MessageLimitReachedError", { enumerable: true, get: function () { return core_1.MessageLimitReachedError; } });
    Object.defineProperty(exports, "NotSupportedError", { enumerable: true, get: function () { return core_1.NotSupportedError; } });
    Object.defineProperty(exports, "OpenError", { enumerable: true, get: function () { return core_1.OpenError; } });
    Object.defineProperty(exports, "SealError", { enumerable: true, get: function () { return core_1.SealError; } });
    Object.defineProperty(exports, "SerializeError", { enumerable: true, get: function () { return core_1.SerializeError; } });
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return core_1.ValidationError; } });
    var identifiers_js_1 = require("./src/identifiers.js");
    Object.defineProperty(exports, "Aead", { enumerable: true, get: function () { return identifiers_js_1.Aead; } });
    Object.defineProperty(exports, "Kdf", { enumerable: true, get: function () { return identifiers_js_1.Kdf; } });
    Object.defineProperty(exports, "Kem", { enumerable: true, get: function () { return identifiers_js_1.Kem; } });
    var cipherSuite_js_1 = require("./src/cipherSuite.js");
    Object.defineProperty(exports, "CipherSuite", { enumerable: true, get: function () { return cipherSuite_js_1.CipherSuite; } });
});
