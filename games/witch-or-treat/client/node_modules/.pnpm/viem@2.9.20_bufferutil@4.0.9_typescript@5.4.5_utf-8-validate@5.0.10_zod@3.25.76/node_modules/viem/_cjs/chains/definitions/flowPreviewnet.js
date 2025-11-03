"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowPreviewnet = void 0;
const defineChain_js_1 = require("../../utils/chain/defineChain.js");
exports.flowPreviewnet = (0, defineChain_js_1.defineChain)({
    id: 646,
    name: 'FlowEVM Previewnet',
    nativeCurrency: {
        decimals: 18,
        name: 'Flow',
        symbol: 'FLOW',
    },
    rpcUrls: {
        default: {
            http: ['https://previewnet.evm.nodes.onflow.org'],
        },
    },
    blockExplorers: {
        default: {
            name: 'Previewnet Explorer',
            url: 'https://previewnet.flowdiver.io',
        },
    },
});
//# sourceMappingURL=flowPreviewnet.js.map