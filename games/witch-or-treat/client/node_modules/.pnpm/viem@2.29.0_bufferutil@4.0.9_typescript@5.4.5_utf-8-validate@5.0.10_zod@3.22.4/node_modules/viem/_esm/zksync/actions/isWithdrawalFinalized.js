import { readContract } from '../../actions/public/readContract.js';
import { ChainNotFoundError, } from '../../errors/chain.js';
import { isAddressEqual, slice } from '../../utils/index.js';
import { l1SharedBridgeAbi, l2SharedBridgeAbi } from '../constants/abis.js';
import { l2BaseTokenAddress } from '../constants/address.js';
import { WithdrawalLogNotFoundError, } from '../errors/bridge.js';
import { getWithdrawalL2ToL1Log } from '../utils/bridge/getWithdrawalL2ToL1Log.js';
import { getWithdrawalLog } from '../utils/bridge/getWithdrawalLog.js';
import { getBaseTokenL1Address } from './getBaseTokenL1Address.js';
import { getDefaultBridgeAddresses } from './getDefaultBridgeAddresses.js';
import { getLogProof } from './getLogProof.js';
/**
 * Returns whether the withdrawal transaction is finalized on the L1 network.
 *
 * @param client - Client to use
 * @param parameters - {@link IsWithdrawalFinalizedParameters}
 * @returns bool - Whether the withdrawal transaction is finalized on the L1 network. {@link IsWithdrawalFinalizedReturnType}
 *
 * @example
 * import { createPublicClient, http } from 'viem'
 * import { mainnet, zksync } from 'viem/chains'
 * import { isWithdrawalFinalized } from 'viem/zksync'
 *
 * const client = createPublicClient({
 *   chain: mainnet,
 *   transport: http(),
 * })
 *
 * const clientL2 = createPublicClient({
 *   chain: zksync,
 *   transport: http(),
 * })
 *
 * const hash = await isWithdrawalFinalized(client, {
 *     client: clientL2,
 *     hash: '0x...',
 * })
 */
export async function isWithdrawalFinalized(client, parameters) {
    const { client: l2Client, hash, index = 0 } = parameters;
    if (!l2Client.chain)
        throw new ChainNotFoundError();
    const { log } = await getWithdrawalLog(l2Client, { hash, index });
    const { l2ToL1LogIndex } = await getWithdrawalL2ToL1Log(l2Client, {
        hash,
        index,
    });
    const sender = slice(log.topics[1], 12);
    // `getLogProof` is called not to get proof but
    // to get the index of the corresponding L2->L1 log,
    // which is returned as `proof.id`.
    const proof = await getLogProof(l2Client, {
        txHash: hash,
        index: l2ToL1LogIndex,
    });
    if (!proof) {
        throw new WithdrawalLogNotFoundError({ hash });
    }
    let l1Bridge;
    if (isAddressEqual(sender, await getBaseTokenL1Address(l2Client)) ||
        isAddressEqual(sender, l2BaseTokenAddress))
        l1Bridge = (await getDefaultBridgeAddresses(l2Client)).sharedL1;
    else
        l1Bridge = await readContract(l2Client, {
            address: sender,
            abi: l2SharedBridgeAbi,
            functionName: 'l1SharedBridge',
            args: [],
        });
    return await readContract(client, {
        address: l1Bridge,
        abi: l1SharedBridgeAbi,
        functionName: 'isWithdrawalFinalized',
        args: [BigInt(l2Client.chain.id), log.l1BatchNumber, BigInt(proof.id)],
    });
}
//# sourceMappingURL=isWithdrawalFinalized.js.map