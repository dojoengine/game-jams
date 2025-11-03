"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.somniaTestnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.somniaTestnet = (0, defineChain_js_1.defineChain)({
    id: 50312,
    name: 'Somnia Testnet',
    nativeCurrency: { name: 'STT', symbol: 'STT', decimals: 18 },
    rpcUrls: {
        default: {
            http: ['https://dream-rpc.somnia.network'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Somnia Testnet Explorer',
            url: 'https://somnia-testnet.socialscan.io',
            apiUrl: 'https://shannon-explorer.somnia.network/api',
        },
    },
    testnet: true,
});
//# sourceMappingURL=somniaTestnet.js.map