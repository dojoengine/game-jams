"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCapabilities = void 0;
const account_js_1 = require("../../errors/account.js");
const accounts_js_1 = require("../../utils/accounts.js");
async function getCapabilities(...parameters) {
    const [client, args] = parameters;
    const account_raw = args?.account ?? client.account;
    if (!account_raw)
        throw new account_js_1.AccountNotFoundError();
    const account = (0, accounts_js_1.parseAccount)(account_raw);
    const capabilities_raw = await client.request({
        method: 'wallet_getCapabilities',
        params: [account.address],
    });
    const capabilities = {};
    for (const [key, value] of Object.entries(capabilities_raw))
        capabilities[Number(key)] = value;
    return capabilities;
}
exports.getCapabilities = getCapabilities;
//# sourceMappingURL=getCapabilities.js.map