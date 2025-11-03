export declare const iotex: {
    blockExplorers: {
        readonly default: {
            readonly name: "IoTeXScan";
            readonly url: "https://iotexscan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
            readonly blockCreated: 22163670;
        };
    };
    id: 4689;
    name: "IoTeX";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "IoTeX";
        readonly symbol: "IOTX";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://babel-api.mainnet.iotex.io"];
            readonly webSocket: readonly ["wss://babel-api.mainnet.iotex.io"];
        };
    };
    sourceId?: number | undefined;
    testnet?: boolean | undefined;
    custom?: Record<string, unknown> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
};
//# sourceMappingURL=iotex.d.ts.map