(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@hpke/common", "./src/aeads/aesGcm.js", "./src/aeads/exportOnly.js", "./src/native.js", "./src/kems/dhkemX25519.js", "./src/kems/dhkemX448.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DhkemX448HkdfSha512 = exports.DhkemX25519HkdfSha256 = exports.HkdfSha512 = exports.HkdfSha384 = exports.HkdfSha256 = exports.DhkemP521HkdfSha512 = exports.DhkemP384HkdfSha384 = exports.DhkemP256HkdfSha256 = exports.CipherSuite = exports.ExportOnly = exports.Aes256Gcm = exports.Aes128Gcm = exports.ValidationError = exports.SerializeError = exports.SealError = exports.OpenError = exports.NotSupportedError = exports.MessageLimitReachedError = exports.KemId = exports.KdfId = exports.InvalidParamError = exports.HpkeError = exports.ExportError = exports.EncapError = exports.DeserializeError = exports.DeriveKeyPairError = exports.DecapError = exports.AeadId = void 0;
    var common_1 = require("@hpke/common");
    Object.defineProperty(exports, "AeadId", { enumerable: true, get: function () { return common_1.AeadId; } });
    Object.defineProperty(exports, "DecapError", { enumerable: true, get: function () { return common_1.DecapError; } });
    Object.defineProperty(exports, "DeriveKeyPairError", { enumerable: true, get: function () { return common_1.DeriveKeyPairError; } });
    Object.defineProperty(exports, "DeserializeError", { enumerable: true, get: function () { return common_1.DeserializeError; } });
    Object.defineProperty(exports, "EncapError", { enumerable: true, get: function () { return common_1.EncapError; } });
    Object.defineProperty(exports, "ExportError", { enumerable: true, get: function () { return common_1.ExportError; } });
    Object.defineProperty(exports, "HpkeError", { enumerable: true, get: function () { return common_1.HpkeError; } });
    Object.defineProperty(exports, "InvalidParamError", { enumerable: true, get: function () { return common_1.InvalidParamError; } });
    Object.defineProperty(exports, "KdfId", { enumerable: true, get: function () { return common_1.KdfId; } });
    Object.defineProperty(exports, "KemId", { enumerable: true, get: function () { return common_1.KemId; } });
    Object.defineProperty(exports, "MessageLimitReachedError", { enumerable: true, get: function () { return common_1.MessageLimitReachedError; } });
    Object.defineProperty(exports, "NotSupportedError", { enumerable: true, get: function () { return common_1.NotSupportedError; } });
    Object.defineProperty(exports, "OpenError", { enumerable: true, get: function () { return common_1.OpenError; } });
    Object.defineProperty(exports, "SealError", { enumerable: true, get: function () { return common_1.SealError; } });
    Object.defineProperty(exports, "SerializeError", { enumerable: true, get: function () { return common_1.SerializeError; } });
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function () { return common_1.ValidationError; } });
    var aesGcm_js_1 = require("./src/aeads/aesGcm.js");
    Object.defineProperty(exports, "Aes128Gcm", { enumerable: true, get: function () { return aesGcm_js_1.Aes128Gcm; } });
    Object.defineProperty(exports, "Aes256Gcm", { enumerable: true, get: function () { return aesGcm_js_1.Aes256Gcm; } });
    var exportOnly_js_1 = require("./src/aeads/exportOnly.js");
    Object.defineProperty(exports, "ExportOnly", { enumerable: true, get: function () { return exportOnly_js_1.ExportOnly; } });
    var native_js_1 = require("./src/native.js");
    Object.defineProperty(exports, "CipherSuite", { enumerable: true, get: function () { return native_js_1.CipherSuite; } });
    Object.defineProperty(exports, "DhkemP256HkdfSha256", { enumerable: true, get: function () { return native_js_1.DhkemP256HkdfSha256; } });
    Object.defineProperty(exports, "DhkemP384HkdfSha384", { enumerable: true, get: function () { return native_js_1.DhkemP384HkdfSha384; } });
    Object.defineProperty(exports, "DhkemP521HkdfSha512", { enumerable: true, get: function () { return native_js_1.DhkemP521HkdfSha512; } });
    Object.defineProperty(exports, "HkdfSha256", { enumerable: true, get: function () { return native_js_1.HkdfSha256; } });
    Object.defineProperty(exports, "HkdfSha384", { enumerable: true, get: function () { return native_js_1.HkdfSha384; } });
    Object.defineProperty(exports, "HkdfSha512", { enumerable: true, get: function () { return native_js_1.HkdfSha512; } });
    var dhkemX25519_js_1 = require("./src/kems/dhkemX25519.js");
    Object.defineProperty(exports, "DhkemX25519HkdfSha256", { enumerable: true, get: function () { return dhkemX25519_js_1.DhkemX25519HkdfSha256; } });
    var dhkemX448_js_1 = require("./src/kems/dhkemX448.js");
    Object.defineProperty(exports, "DhkemX448HkdfSha512", { enumerable: true, get: function () { return dhkemX448_js_1.DhkemX448HkdfSha512; } });
});
