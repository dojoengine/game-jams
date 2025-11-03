export declare const zetachain: {
    blockExplorers: {
        readonly default: {
            readonly name: "ZetaScan";
            readonly url: "https://explorer.zetachain.com";
        };
    };
    contracts?: {
        [x: string]: import("../../index.js").ChainContract | {
            [sourceId: number]: import("../../index.js").ChainContract | undefined;
        } | undefined;
        ensRegistry?: import("../../index.js").ChainContract | undefined;
        ensUniversalResolver?: import("../../index.js").ChainContract | undefined;
        multicall3?: import("../../index.js").ChainContract | undefined;
    } | undefined;
    id: 7000;
    name: "ZetaChain";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "Zeta";
        readonly symbol: "ZETA";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://zetachain-evm.blockpi.network/v1/rpc/public"];
        };
    };
    sourceId?: number | undefined;
    testnet: false;
    custom?: Record<string, unknown> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
};
//# sourceMappingURL=zetachain.d.ts.map