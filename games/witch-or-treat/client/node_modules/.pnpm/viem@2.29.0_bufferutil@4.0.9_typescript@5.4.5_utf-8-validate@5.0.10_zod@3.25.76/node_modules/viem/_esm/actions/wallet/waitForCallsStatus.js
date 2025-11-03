import { BaseError } from '../../errors/base.js';
import { observe } from '../../utils/observe.js';
import { poll } from '../../utils/poll.js';
import { withResolvers } from '../../utils/promise/withResolvers.js';
import { stringify } from '../../utils/stringify.js';
import { getCallsStatus, } from './getCallsStatus.js';
/**
 * Waits for the status & receipts of a call bundle that was sent via `sendCalls`.
 *
 * - Docs: https://viem.sh/docs/actions/wallet/waitForCallsStatus
 * - JSON-RPC Methods: [`wallet_getCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)
 *
 * @param client - Client to use
 * @param parameters - {@link WaitForCallsStatusParameters}
 * @returns Status & receipts of the call bundle. {@link WaitForCallsStatusReturnType}
 *
 * @example
 * import { createWalletClient, custom } from 'viem'
 * import { mainnet } from 'viem/chains'
 * import { waitForCallsStatus } from 'viem/actions'
 *
 * const client = createWalletClient({
 *   chain: mainnet,
 *   transport: custom(window.ethereum),
 * })
 *
 * const { receipts, status } = await waitForCallsStatus(client, { id: '0xdeadbeef' })
 */
export async function waitForCallsStatus(client, parameters) {
    const { id, pollingInterval = client.pollingInterval, status = ({ statusCode }) => statusCode >= 200, timeout = 60_000, } = parameters;
    const observerId = stringify(['waitForCallsStatus', client.uid, id]);
    const { promise, resolve, reject } = withResolvers();
    let timer = undefined;
    const unobserve = observe(observerId, { resolve, reject }, (emit) => {
        const unpoll = poll(async () => {
            const done = (fn) => {
                clearTimeout(timer);
                unpoll();
                fn();
                unobserve();
            };
            try {
                const result = await getCallsStatus(client, { id });
                if (!status(result))
                    return;
                done(() => emit.resolve(result));
            }
            catch (error) {
                done(() => emit.reject(error));
            }
        }, {
            interval: pollingInterval,
            emitOnBegin: true,
        });
        return unpoll;
    });
    timer = timeout
        ? setTimeout(() => {
            unobserve();
            clearTimeout(timer);
            reject(new WaitForCallsStatusTimeoutError({ id }));
        }, timeout)
        : undefined;
    return await promise;
}
export class WaitForCallsStatusTimeoutError extends BaseError {
    constructor({ id }) {
        super(`Timed out while waiting for call bundle with id "${id}" to be confirmed.`, { name: 'WaitForCallsStatusTimeoutError' });
    }
}
//# sourceMappingURL=waitForCallsStatus.js.map