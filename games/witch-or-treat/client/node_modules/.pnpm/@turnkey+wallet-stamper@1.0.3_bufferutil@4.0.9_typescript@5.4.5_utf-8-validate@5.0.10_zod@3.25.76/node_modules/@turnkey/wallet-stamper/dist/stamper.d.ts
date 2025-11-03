import { type TStamper, type WalletInterface, type TStamp } from "./types";
export declare class WalletStamper implements TStamper {
    private wallet;
    constructor(wallet: WalletInterface);
    stamp(payload: string): Promise<TStamp>;
}
//# sourceMappingURL=stamper.d.ts.map