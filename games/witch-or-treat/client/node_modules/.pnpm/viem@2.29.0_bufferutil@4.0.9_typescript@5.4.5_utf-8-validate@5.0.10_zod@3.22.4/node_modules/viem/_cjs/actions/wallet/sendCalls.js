"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCalls = sendCalls;
const parseAccount_js_1 = require("../../accounts/utils/parseAccount.js");
const account_js_1 = require("../../errors/account.js");
const encodeFunctionData_js_1 = require("../../utils/abi/encodeFunctionData.js");
const toHex_js_1 = require("../../utils/encoding/toHex.js");
const getTransactionError_js_1 = require("../../utils/errors/getTransactionError.js");
async function sendCalls(client, parameters) {
    const { account: account_ = client.account, chain = client.chain, forceAtomic = false, id, version = '2.0.0', } = parameters;
    if (typeof account_ === 'undefined')
        throw new account_js_1.AccountNotFoundError({
            docsPath: '/docs/actions/wallet/sendCalls',
        });
    const account = account_ ? (0, parseAccount_js_1.parseAccount)(account_) : null;
    const calls = parameters.calls.map((call_) => {
        const call = call_;
        const data = call.abi
            ? (0, encodeFunctionData_js_1.encodeFunctionData)({
                abi: call.abi,
                functionName: call.functionName,
                args: call.args,
            })
            : call.data;
        return {
            data,
            to: call.to,
            value: call.value ? (0, toHex_js_1.numberToHex)(call.value) : undefined,
        };
    });
    try {
        const response = await client.request({
            method: 'wallet_sendCalls',
            params: [
                {
                    atomicRequired: forceAtomic,
                    calls,
                    capabilities: formatRequestCapabilities(parameters.capabilities),
                    chainId: (0, toHex_js_1.numberToHex)(chain.id),
                    from: account?.address,
                    id,
                    version,
                },
            ],
        }, { retryCount: 0 });
        if (typeof response === 'string')
            return { id: response };
        return response;
    }
    catch (err) {
        throw (0, getTransactionError_js_1.getTransactionError)(err, {
            ...parameters,
            account,
            chain: parameters.chain,
        });
    }
}
function formatRequestCapabilities(capabilities) {
    const paymasterService = capabilities?.paymasterService
        ? Object.entries(capabilities.paymasterService).reduce((paymasterService, [chainId, value]) => ({
            ...(paymasterService ?? {}),
            [(0, toHex_js_1.numberToHex)(Number(chainId))]: value,
        }), {})
        : undefined;
    return {
        ...capabilities,
        ...(paymasterService
            ? {
                paymasterService,
            }
            : {}),
    };
}
//# sourceMappingURL=sendCalls.js.map