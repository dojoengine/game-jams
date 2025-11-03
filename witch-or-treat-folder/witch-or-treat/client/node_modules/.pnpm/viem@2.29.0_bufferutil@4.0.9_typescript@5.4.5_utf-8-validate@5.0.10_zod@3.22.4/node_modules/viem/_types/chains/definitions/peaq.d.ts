export declare const peaq: {
    blockExplorers: {
        readonly default: {
            readonly name: "Subscan";
            readonly url: "https://peaq.subscan.io";
        };
    };
    contracts: {
        readonly multicall3: {
            readonly address: "0xca11bde05977b3631167028862be2a173976ca11";
            readonly blockCreated: 3566354;
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 3338;
    name: "Peaq";
    nativeCurrency: {
        readonly decimals: 18;
        readonly name: "peaq";
        readonly symbol: "PEAQ";
    };
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://peaq-rpc.publicnode.com", "https://peaq.api.onfinality.io/public", "https://peaq-rpc.dwellir.com", "https://evm.peaq.network"];
            readonly webSocket: readonly ["wss://peaq-rpc.publicnode.com", "wss://peaq.api.onfinality.io/public", "wss://peaq-rpc.dwellir.com"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    fees?: import("../../index.js").ChainFees<undefined> | undefined;
    formatters?: undefined;
    serializers?: import("../../index.js").ChainSerializers<undefined, import("../../index.js").TransactionSerializable> | undefined;
};
//# sourceMappingURL=peaq.d.ts.map