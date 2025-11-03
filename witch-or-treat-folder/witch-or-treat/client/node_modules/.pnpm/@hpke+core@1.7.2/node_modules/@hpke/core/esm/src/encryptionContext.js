import { i2Osp, MessageLimitReachedError, xor } from "@hpke/common";
import { ExporterContextImpl } from "./exporterContext.js";
export class EncryptionContextImpl extends ExporterContextImpl {
    constructor(api, kdf, params) {
        super(api, kdf, params.exporterSecret);
        // AEAD id.
        Object.defineProperty(this, "_aead", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // The length in bytes of a key for the algorithm.
        Object.defineProperty(this, "_nK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // The length in bytes of a nonce for the algorithm.
        Object.defineProperty(this, "_nN", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // The length in bytes of an authentication tag for the algorithm.
        Object.defineProperty(this, "_nT", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // The end-to-end encryption key information.
        Object.defineProperty(this, "_ctx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (params.key === undefined || params.baseNonce === undefined ||
            params.seq === undefined) {
            throw new Error("Required parameters are missing");
        }
        this._aead = params.aead;
        this._nK = this._aead.keySize;
        this._nN = this._aead.nonceSize;
        this._nT = this._aead.tagSize;
        const key = this._aead.createEncryptionContext(params.key);
        this._ctx = {
            key: key,
            baseNonce: params.baseNonce,
            seq: params.seq,
        };
    }
    computeNonce(k) {
        const seqBytes = i2Osp(k.seq, k.baseNonce.byteLength);
        return xor(k.baseNonce, seqBytes).buffer;
    }
    incrementSeq(k) {
        // if (this.seq >= (1 << (8 * this.baseNonce.byteLength)) - 1) {
        if (k.seq > Number.MAX_SAFE_INTEGER) {
            throw new MessageLimitReachedError("Message limit reached");
        }
        k.seq += 1;
        return;
    }
}
