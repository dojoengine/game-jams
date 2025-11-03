import { Dhkem, HkdfSha256Native, KemId } from "@hpke/common";
import { X25519 } from "./dhkemPrimitives/x25519.js";
/**
 * The DHKEM(X25519, HKDF-SHA256) for HPKE KEM implementing {@link KemInterface}.
 *
 * The instance of this class can be specified to the
 * {@link https://jsr.io/@hpke/core/doc/~/CipherSuiteParams | CipherSuiteParams} as follows:
 *
 * @example
 *
 * ```ts
 * import {
 *   Aes128Gcm,
 *   CipherSuite,
 *   HkdfSha256,
 *   DhkemX25519HkdfSha256,
 * } from "@hpke/core";
 *
 * const suite = new CipherSuite({
 *   kem: new DhkemX25519HkdfSha256(),
 *   kdf: new HkdfSha256(),
 *   aead: new Aes128Gcm(),
 * });
 * ```
 */
export class DhkemX25519HkdfSha256 extends Dhkem {
    constructor() {
        const kdf = new HkdfSha256Native();
        super(KemId.DhkemX25519HkdfSha256, new X25519(kdf), kdf);
        /** KemId.DhkemX25519HkdfSha256 (0x0020) */
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: KemId.DhkemX25519HkdfSha256
        });
        /** 32 */
        Object.defineProperty(this, "secretSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 32
        });
        /** 32 */
        Object.defineProperty(this, "encSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 32
        });
        /** 32 */
        Object.defineProperty(this, "publicKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 32
        });
        /** 32 */
        Object.defineProperty(this, "privateKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 32
        });
    }
}
