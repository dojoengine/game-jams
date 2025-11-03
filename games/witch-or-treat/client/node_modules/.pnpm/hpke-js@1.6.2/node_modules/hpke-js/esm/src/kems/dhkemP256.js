import { Dhkem, Ec, KemId } from "@hpke/common";
import { HkdfSha256 } from "@hpke/dhkem-x25519";
export class DhkemP256HkdfSha256 extends Dhkem {
    constructor() {
        const kdf = new HkdfSha256();
        const prim = new Ec(KemId.DhkemP256HkdfSha256, kdf);
        super(KemId.DhkemP256HkdfSha256, prim, kdf);
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: KemId.DhkemP256HkdfSha256
        });
        Object.defineProperty(this, "secretSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 32
        });
        Object.defineProperty(this, "encSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 65
        });
        Object.defineProperty(this, "publicKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 65
        });
        Object.defineProperty(this, "privateKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 32
        });
    }
}
