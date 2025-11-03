import { AeadId, NotSupportedError } from "@hpke/common";
/**
 * The ExportOnly mode for HPKE AEAD implementing {@link AeadInterface}.
 *
 * When using `@hpke/core`, the instance of this class must be specified
 * to the `aead` parameter of {@link CipherSuiteParams} instead of `AeadId.ExportOnly`
 * as follows:
 *
 * @example
 *
 * ```ts
 * import {
 *   CipherSuite,
 *   DhkemP256HkdfSha256,
 *   ExportOnly,
 *   HkdfSha256,
 * } from "@hpke/core";
 *
 * const suite = new CipherSuite({
 *   kem: new DhkemP256HkdfSha256(),
 *   kdf: new HkdfSha256(),
 *   aead: new ExportOnly(),
 * });
 * ```
 */
export class ExportOnly {
    constructor() {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: AeadId.ExportOnly
        });
        Object.defineProperty(this, "keySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "nonceSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "tagSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
    }
    createEncryptionContext(_key) {
        throw new NotSupportedError("Export only");
    }
}
