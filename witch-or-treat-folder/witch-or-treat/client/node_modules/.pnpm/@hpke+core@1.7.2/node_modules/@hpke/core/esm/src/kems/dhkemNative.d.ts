import { Dhkem, KemId } from "@hpke/common";
export declare class DhkemP256HkdfSha256Native extends Dhkem {
    id: KemId;
    secretSize: number;
    encSize: number;
    publicKeySize: number;
    privateKeySize: number;
    constructor();
}
export declare class DhkemP384HkdfSha384Native extends Dhkem {
    id: KemId;
    secretSize: number;
    encSize: number;
    publicKeySize: number;
    privateKeySize: number;
    constructor();
}
export declare class DhkemP521HkdfSha512Native extends Dhkem {
    id: KemId;
    secretSize: number;
    encSize: number;
    publicKeySize: number;
    privateKeySize: number;
    constructor();
}
//# sourceMappingURL=dhkemNative.d.ts.map