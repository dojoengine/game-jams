import type { Signature } from '../index.js';
import type { ZkSyncTransactionSerializable, ZkSyncTransactionSerializedEIP712 } from './types/transaction.js';
export declare function serializeTransaction(transaction: ZkSyncTransactionSerializable, signature?: Signature | undefined): `0x02${string}` | `0x01${string}` | `0x03${string}` | import("../index.js").TransactionSerializedLegacy | `0x71${string}`;
export declare const serializers: {
    readonly transaction: typeof serializeTransaction;
};
export type SerializeTransactionEIP712ReturnType = ZkSyncTransactionSerializedEIP712;
//# sourceMappingURL=serializers.d.ts.map