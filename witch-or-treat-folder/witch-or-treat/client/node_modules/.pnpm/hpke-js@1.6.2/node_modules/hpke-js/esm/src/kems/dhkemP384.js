import { Dhkem, Ec, KemId } from "@hpke/common";
import { HkdfSha384 } from "../kdfs/hkdfSha384.js";
export class DhkemP384HkdfSha384 extends Dhkem {
    constructor() {
        const kdf = new HkdfSha384();
        const prim = new Ec(KemId.DhkemP384HkdfSha384, kdf);
        super(KemId.DhkemP384HkdfSha384, prim, kdf);
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: KemId.DhkemP384HkdfSha384
        });
        Object.defineProperty(this, "secretSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 48
        });
        Object.defineProperty(this, "encSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 97
        });
        Object.defineProperty(this, "publicKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 97
        });
        Object.defineProperty(this, "privateKeySize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 48
        });
    }
}
