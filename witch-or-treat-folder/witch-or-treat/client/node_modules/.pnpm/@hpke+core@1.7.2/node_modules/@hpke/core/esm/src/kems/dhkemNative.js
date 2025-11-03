import { Dhkem, Ec, HkdfSha256Native, HkdfSha384Native, HkdfSha512Native, KemId, } from "@hpke/common";
export class DhkemP256HkdfSha256Native extends Dhkem {
    constructor() {
        const kdf = new HkdfSha256Native();
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
export class DhkemP384HkdfSha384Native extends Dhkem {
    constructor() {
        const kdf = new HkdfSha384Native();
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
export class DhkemP521HkdfSha512Native extends Dhkem {
    constructor() {
        const kdf = new HkdfSha512Native();
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
