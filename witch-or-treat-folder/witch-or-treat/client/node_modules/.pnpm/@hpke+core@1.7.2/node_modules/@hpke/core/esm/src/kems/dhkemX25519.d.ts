import { Dhkem, KemId } from "@hpke/common";
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
export declare class DhkemX25519HkdfSha256 extends Dhkem {
    /** KemId.DhkemX25519HkdfSha256 (0x0020) */
    id: KemId;
    /** 32 */
    secretSize: number;
    /** 32 */
    encSize: number;
    /** 32 */
    publicKeySize: number;
    /** 32 */
    privateKeySize: number;
    constructor();
}
//# sourceMappingURL=dhkemX25519.d.ts.map