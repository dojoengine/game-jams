import { Dhkem, HkdfSha512Native, KemId } from "@hpke/common";
import { X448 } from "./dhkemPrimitives/x448.js";
/**
 * The DHKEM(X448, HKDF-SHA512) for HPKE KEM implementing {@link KemInterface}.
 *
 * The instance of this class can be specified to the
 * {@link https://jsr.io/@hpke/core/doc/~/CipherSuiteParams | CipherSuiteParams} as follows:
 *
 * @example
 *
 * ```ts
 * import {
 *   Aes256Gcm,
 *   CipherSuite,
 *   HkdfSha512,
 *   DhkemX448HkdfSha512,
 * } from "@hpke/core";
 *
 * const suite = new CipherSuite({
 *   kem: new DhkemX448HkdfSha512(),
 *   kdf: new HkdfSha512(),
 *   aead: new Aes256Gcm(),
 * });
 * ```
 */
export class DhkemX448HkdfSha512 extends Dhkem {
    constructor() {
        const kdf = new HkdfSha512Native();
        super(KemId.DhkemX448HkdfSha512, new X448(kdf), kdf);
        /** KemId.DhkemX448HkdfSha512 (0x0021) */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: KemId.DhkemX448HkdfSha512
        });
        /** 64 */
        Object.defineProperty(this, "secretSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 64
        });
        /** 56 */
        Object.defineProperty(this, "encSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 56
        });
        /** 56 */
        Object.defineProperty(this, "publicKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 56
        });
        /** 56 */
        Object.defineProperty(this, "privateKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 56
        });
    }
}
