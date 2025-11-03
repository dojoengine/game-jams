"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallsStatus = getCallsStatus;
const fromHex_js_1 = require("../../utils/encoding/fromHex.js");
const transactionReceipt_js_1 = require("../../utils/formatters/transactionReceipt.js");
async function getCallsStatus(client, parameters) {
    const { atomic = false, chainId, receipts, version = '2.0.0', ...response } = await client.request({
        method: 'wallet_getCallsStatus',
        params: [parameters.id],
    });
    const [status, statusCode] = (() => {
        const statusCode = response.status;
        if (statusCode >= 100 && statusCode < 200)
            return ['pending', statusCode];
        if (statusCode >= 200 && statusCode < 300)
            return ['success', statusCode];
        if (statusCode >= 300 && statusCode < 700)
            return ['failure', statusCode];
        if (statusCode === 'CONFIRMED')
            return ['success', 200];
        if (statusCode === 'PENDING')
            return ['pending', 100];
        return [undefined, statusCode];
    })();
    return {
        ...response,
        atomic,
        chainId: chainId ? (0, fromHex_js_1.hexToNumber)(chainId) : undefined,
        receipts: receipts?.map((receipt) => ({
            ...receipt,
            blockNumber: (0, fromHex_js_1.hexToBigInt)(receipt.blockNumber),
            gasUsed: (0, fromHex_js_1.hexToBigInt)(receipt.gasUsed),
            status: transactionReceipt_js_1.receiptStatuses[receipt.status],
        })) ?? [],
        statusCode,
        status,
        version,
    };
}
//# sourceMappingURL=getCallsStatus.js.map