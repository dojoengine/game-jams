"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCalls = void 0;
const account_js_1 = require("../../errors/account.js");
const chain_js_1 = require("../../errors/chain.js");
const accounts_js_1 = require("../../utils/accounts.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const index_js_1 = require("../../utils/index.js");
async function sendCalls(client, parameters) {
    const { account: account_ = client.account, calls, capabilities, chain = client.chain, version = '1.0', } = parameters;
    if (!account_)
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/experimental/actions/sendCalls',
        });
    const account = (0, accounts_js_1.parseAccount)(account_);
    if (!chain)
        throw new chain_js_1.ChainNotFoundError();
    try {
        return await client.request({
            method: 'wallet_sendCalls',
            params: [
                {
                    calls: calls.map((call) => ({
                        ...call,
                        value: call.value ? (0, toHex_js_1.numberToHex)(call.value) : undefined,
                    })),
                    capabilities,
                    chainId: (0, toHex_js_1.numberToHex)(chain.id),
                    from: account.address,
                    version,
                },
            ],
        }, { retryCount: 0 });
    }
    catch (err) {
        throw (0, index_js_1.getTransactionError)(err, {
            ...parameters,
            account,
            chain: parameters.chain,
        });
    }
}
exports.sendCalls = sendCalls;
//# sourceMappingURL=sendCalls.js.map