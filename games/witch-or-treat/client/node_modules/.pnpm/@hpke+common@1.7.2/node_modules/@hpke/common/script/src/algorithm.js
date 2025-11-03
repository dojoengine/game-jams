var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../_dnt.shims.js", "./errors.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    var __syncRequire = typeof module === "object" && typeof module.exports === "object";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NativeAlgorithm = void 0;
    const dntShim = __importStar(require("../_dnt.shims.js"));
    const errors_js_1 = require("./errors.js");
    async function loadSubtleCrypto() {
        if (dntShim.dntGlobalThis !== undefined && globalThis.crypto !== undefined) {
            // Browsers, Node.js >= v19, Cloudflare Workers, Bun, etc.
            return globalThis.crypto.subtle;
        }
        // Node.js <= v18
        try {
            // @ts-ignore: to ignore "crypto"
            const { webcrypto } = await (__syncRequire ? Promise.resolve().then(() => __importStar(require("crypto"))) : new Promise((resolve_1, reject_1) => { require(["crypto"], resolve_1, reject_1); }).then(__importStar)); // node:crypto
            return webcrypto.subtle;
        }
        catch (e) {
            throw new errors_js_1.NotSupportedError(e);
        }
    }
    class NativeAlgorithm {
        constructor() {
            Object.defineProperty(this, "_api", {
                enumerable: true,
                configurable: true,
                writable: true,
                value: undefined
            });
        }
        async _setup() {
            if (this._api !== undefined) {
                return;
            }
            this._api = await loadSubtleCrypto();
        }
    }
    exports.NativeAlgorithm = NativeAlgorithm;
});
