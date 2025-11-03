import { Dhkem, Ec, KemId } from "@hpke/common";
import { HkdfSha512 } from "@hpke/dhkem-x448";
export class DhkemP521HkdfSha512 extends Dhkem {
    constructor() {
        const kdf = new HkdfSha512();
        const prim = new Ec(KemId.DhkemP521HkdfSha512, kdf);
        super(KemId.DhkemP521HkdfSha512, prim, kdf);
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: KemId.DhkemP521HkdfSha512
        });
        Object.defineProperty(this, "secretSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 64
        });
        Object.defineProperty(this, "encSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 133
        });
        Object.defineProperty(this, "publicKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 133
        });
        Object.defineProperty(this, "privateKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 64
        });
    }
}
