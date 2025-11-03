"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zetachain = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.zetachain = (0, defineChain_js_1.defineChain)({
    id: 7000,
    name: 'ZetaChain',
    nativeCurrency: {
        decimals: 18,
        name: 'Zeta',
        symbol: 'ZETA',
    },
    rpcUrls: {
        default: {
            http: ['https://zetachain-evm.blockpi.network/v1/rpc/public'],
        },
    },
    blockExplorers: {
        default: {
            name: 'ZetaScan',
            url: 'https://explorer.zetachain.com',
        },
    },
    testnet: false,
});
//# sourceMappingURL=zetachain.js.map