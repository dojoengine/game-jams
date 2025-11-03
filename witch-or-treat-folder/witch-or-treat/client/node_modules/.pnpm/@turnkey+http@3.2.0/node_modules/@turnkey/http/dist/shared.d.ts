import type { definitions } from "./__generated__/services/coordinator/public/v1/public_api.types";
export type TActivity = definitions["v1Activity"];
export type TActivityResponse = definitions["v1ActivityResponse"];
export type TActivityId = TActivity["id"];
export type TActivityStatus = TActivity["status"];
export type TActivityType = TActivity["type"];
export type TSignature = definitions["v1SignRawPayloadResult"];
export type TSignedTransaction = definitions["v1SignTransactionResult"]["signedTransaction"];
export declare class TurnkeyActivityError extends Error {
    activityId: TActivityId | undefined;
    activityStatus: TActivityStatus | undefined;
    activityType: TActivityType | undefined;
    cause: Error | undefined;
    constructor(input: {
        message: string;
        cause?: Error | undefined;
        activityId?: TActivityId | undefined;
        activityStatus?: TActivityStatus | undefined;
        activityType?: TActivityType | undefined;
    });
}
export declare class TurnkeyActivityConsensusNeededError extends Error {
    activityId: TActivityId | undefined;
    activityStatus: TActivityStatus | undefined;
    activityType: TActivityType | undefined;
    cause: Error | undefined;
    constructor(input: {
        message: string;
        cause?: Error | undefined;
        activityId?: TActivityId | undefined;
        activityStatus?: TActivityStatus | undefined;
        activityType?: TActivityType | undefined;
    });
}
export declare class InvalidArgumentError extends Error {
    activityId: TActivityId | undefined;
    activityStatus: TActivityStatus | undefined;
    activityType: TActivityType | undefined;
    cause: Error | undefined;
    constructor(input: {
        message: string;
        cause?: Error | undefined;
        activityId?: TActivityId | undefined;
        activityStatus?: TActivityStatus | undefined;
        activityType?: TActivityType | undefined;
    });
}
export declare function assertActivityCompleted(activity: TActivity): boolean;
export declare function stableStringify(input: Record<string, any>): string;
export declare function assertNonNull<T>(input: T | null | undefined): T;
export declare const TERMINAL_ACTIVITY_STATUSES: definitions["v1ActivityStatus"][];
/**
 * This function is a helper method to easily extract a signature string from a completed signing activity.
 * Particularly useful for scenarios where a signature requires consensus
 *
 * @param activity the signing activity
 * @return signature {r, s, v}
 */
export declare function getSignatureFromActivity(activity: TActivity): TSignature;
/**
 * This function is a helper method to easily extract signature strings from a completed signing activity.
 * Particularly useful for scenarios where a signature requires consensus
 *
 * @param activity the signing activity
 * @return signatures {r, s, v}[]
 */
export declare function getSignaturesFromActivity(activity: TActivity): TSignature[];
/**
 * This function is a helper method to easily extract a signed transaction from a completed signing activity.
 * Particularly useful for scenarios where a signature requires consensus
 *
 * @param activity the signing activity
 * @return signed transaction string
 */
export declare function getSignedTransactionFromActivity(activity: TActivity): TSignedTransaction;
//# sourceMappingURL=shared.d.ts.map