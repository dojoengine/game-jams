'use strict';

class TurnkeyActivityError extends Error {
    constructor(input) {
        const { message, cause, activityId, activityStatus, activityType } = input;
        super(message);
        this.name = "TurnkeyActivityError";
        this.activityId = activityId ?? undefined;
        this.activityStatus = activityStatus ?? undefined;
        this.activityType = activityType ?? undefined;
        this.cause = cause ?? undefined;
    }
}
class TurnkeyActivityConsensusNeededError extends Error {
    constructor(input) {
        const { message, cause, activityId, activityStatus, activityType } = input;
        super(message);
        this.name = "TurnkeyActivityConsensusNeededError";
        this.activityId = activityId ?? undefined;
        this.activityStatus = activityStatus ?? undefined;
        this.activityType = activityType ?? undefined;
        this.cause = cause ?? undefined;
    }
}
class InvalidArgumentError extends Error {
    constructor(input) {
        const { message, cause, activityId, activityStatus, activityType } = input;
        super(message);
        this.name = "InvalidArgumentError";
        this.activityId = activityId ?? undefined;
        this.activityStatus = activityStatus ?? undefined;
        this.activityType = activityType ?? undefined;
        this.cause = cause ?? undefined;
    }
}
function assertActivityCompleted(activity) {
    const { id: activityId, status: activityStatus } = activity;
    if (activityStatus === "ACTIVITY_STATUS_CONSENSUS_NEEDED") {
        throw new TurnkeyActivityConsensusNeededError({
            message: "Activity requires consensus",
            activityId,
            activityStatus,
        });
    }
    if (activityStatus !== "ACTIVITY_STATUS_COMPLETED") {
        throw new TurnkeyActivityError({
            message: `Expected COMPLETED status, got ${activityStatus}`,
            activityId,
            activityStatus,
        });
    }
    return true;
}
function assertNonNull(input) {
    if (input == null) {
        throw new Error(`Got unexpected ${JSON.stringify(input)}`);
    }
    return input;
}
const TERMINAL_ACTIVITY_STATUSES = [
    "ACTIVITY_STATUS_COMPLETED",
    "ACTIVITY_STATUS_FAILED",
    "ACTIVITY_STATUS_REJECTED",
];
/**
 * This function is a helper method to easily extract a signature string from a completed signing activity.
 * Particularly useful for scenarios where a signature requires consensus
 *
 * @param activity the signing activity
 * @return signature {r, s, v}
 */
function getSignatureFromActivity(activity) {
    if (![
        "ACTIVITY_TYPE_SIGN_RAW_PAYLOAD",
        "ACTIVITY_TYPE_SIGN_RAW_PAYLOAD_V2",
    ].includes(activity.type)) {
        throw new InvalidArgumentError({
            message: `Cannot get signature from activity type: ${activity.type}`,
            activityId: activity.id,
            activityStatus: activity.status,
        });
    }
    assertActivityCompleted(activity);
    const signature = activity.result?.signRawPayloadResult;
    return assertNonNull(signature);
}
/**
 * This function is a helper method to easily extract signature strings from a completed signing activity.
 * Particularly useful for scenarios where a signature requires consensus
 *
 * @param activity the signing activity
 * @return signatures {r, s, v}[]
 */
function getSignaturesFromActivity(activity) {
    if (!["ACTIVITY_TYPE_SIGN_RAW_PAYLOADS"].includes(activity.type)) {
        throw new InvalidArgumentError({
            message: `Cannot get signature from activity type: ${activity.type}`,
            activityId: activity.id,
            activityStatus: activity.status,
        });
    }
    assertActivityCompleted(activity);
    const { signatures } = activity.result?.signRawPayloadsResult;
    return assertNonNull(signatures);
}
/**
 * This function is a helper method to easily extract a signed transaction from a completed signing activity.
 * Particularly useful for scenarios where a signature requires consensus
 *
 * @param activity the signing activity
 * @return signed transaction string
 */
function getSignedTransactionFromActivity(activity) {
    if (![
        "ACTIVITY_TYPE_SIGN_TRANSACTION",
        "ACTIVITY_TYPE_SIGN_TRANSACTION_V2",
    ].includes(activity.type)) {
        throw new InvalidArgumentError({
            message: `Cannot get signed transaction from activity type: ${activity.type}`,
            activityId: activity.id,
            activityStatus: activity.status,
        });
    }
    assertActivityCompleted(activity);
    const { signedTransaction } = activity.result?.signTransactionResult;
    return assertNonNull(`0x${signedTransaction}`);
}

exports.InvalidArgumentError = InvalidArgumentError;
exports.TERMINAL_ACTIVITY_STATUSES = TERMINAL_ACTIVITY_STATUSES;
exports.TurnkeyActivityConsensusNeededError = TurnkeyActivityConsensusNeededError;
exports.TurnkeyActivityError = TurnkeyActivityError;
exports.assertActivityCompleted = assertActivityCompleted;
exports.assertNonNull = assertNonNull;
exports.getSignatureFromActivity = getSignatureFromActivity;
exports.getSignaturesFromActivity = getSignaturesFromActivity;
exports.getSignedTransactionFromActivity = getSignedTransactionFromActivity;
//# sourceMappingURL=shared.js.map
