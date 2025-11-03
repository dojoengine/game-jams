import { Dhkem, KemId } from "@hpke/common";
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
export declare class DhkemX448HkdfSha512 extends Dhkem {
    /** KemId.DhkemX448HkdfSha512 (0x0021) */
    id: KemId;
    /** 64 */
    secretSize: number;
    /** 56 */
    encSize: number;
    /** 56 */
    publicKeySize: number;
    /** 56 */
    privateKeySize: number;
    constructor();
}
//# sourceMappingURL=dhkemX448.d.ts.map