import * as dntShim from "../_dnt.shims.js";
import { NotSupportedError } from "./errors.js";
async function loadSubtleCrypto() {
    if (dntShim.dntGlobalThis !== undefined && globalThis.crypto !== undefined) {
        // Browsers, Node.js >= v19, Cloudflare Workers, Bun, etc.
        return globalThis.crypto.subtle;
    }
    // Node.js <= v18
    try {
        // @ts-ignore: to ignore "crypto"
        const { webcrypto } = await import("crypto"); // node:crypto
        return webcrypto.subtle;
    }
    catch (e) {
        throw new NotSupportedError(e);
    }
}
export class NativeAlgorithm {
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
