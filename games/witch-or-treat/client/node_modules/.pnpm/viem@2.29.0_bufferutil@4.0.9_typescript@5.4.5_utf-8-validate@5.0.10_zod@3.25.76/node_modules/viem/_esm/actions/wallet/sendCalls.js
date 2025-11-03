import { parseAccount } from '../../accounts/utils/parseAccount.js';
import { AccountNotFoundError } from '../../errors/account.js';
import { encodeFunctionData } from '../../utils/abi/encodeFunctionData.js';
import { numberToHex } from '../../utils/encoding/toHex.js';
import { getTransactionError } from '../../utils/errors/getTransactionError.js';
/**
 * Requests the connected wallet to send a batch of calls.
 *
 * - Docs: https://viem.sh/docs/actions/wallet/sendCalls
 * - JSON-RPC Methods: [`wallet_sendCalls`](https://eips.ethereum.org/EIPS/eip-5792)
 *
 * @param client - Client to use
 * @returns Transaction identifier. {@link SendCallsReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { sendCalls } from 'viem/actions'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 * const id = await sendCalls(client, {
 *   account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
 *   calls: [
 *     {
 *       data: '0xdeadbeef',
 *       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *     },
 *     {
 *       to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
 *       value: 69420n,
 *     },
 *   ],
 * })
 */
export async function sendCalls(client, parameters) {
    const { account: account_ = client.account, chain = client.chain, forceAtomic = false, id, version = '2.0.0', } = parameters;
    if (typeof account_ === 'undefined')
        throw new AccountNotFoundError({
            docsPath: '/docs/actions/wallet/sendCalls',
        });
    const account = account_ ? parseAccount(account_) : null;
    const calls = parameters.calls.map((call_) => {
        const call = call_;
        const data = call.abi
            ? encodeFunctionData({
                abi: call.abi,
                functionName: call.functionName,
                args: call.args,
            })
            : call.data;
        return {
            data,
            to: call.to,
            value: call.value ? numberToHex(call.value) : undefined,
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
                    chainId: numberToHex(chain.id),
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
        throw getTransactionError(err, {
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
            [numberToHex(Number(chainId))]: value,
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