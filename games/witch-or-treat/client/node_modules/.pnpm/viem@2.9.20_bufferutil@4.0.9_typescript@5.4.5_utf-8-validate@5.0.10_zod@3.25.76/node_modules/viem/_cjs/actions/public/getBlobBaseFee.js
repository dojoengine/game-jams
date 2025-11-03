"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlobBaseFee = void 0;
async function getBlobBaseFee(client) {
    const baseFee = await client.request({
        method: 'eth_blobBaseFee',
    });
    return BigInt(baseFee);
}
exports.getBlobBaseFee = getBlobBaseFee;
//# sourceMappingURL=getBlobBaseFee.js.map