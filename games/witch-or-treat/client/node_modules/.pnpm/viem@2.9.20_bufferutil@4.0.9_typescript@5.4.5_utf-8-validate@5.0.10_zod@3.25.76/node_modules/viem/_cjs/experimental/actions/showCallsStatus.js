"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCallsStatus = void 0;
async function showCallsStatus(client, parameters) {
    const { id } = parameters;
    await client.request({
        method: 'wallet_showCallsStatus',
        params: [id],
    });
    return;
}
exports.showCallsStatus = showCallsStatus;
//# sourceMappingURL=showCallsStatus.js.map