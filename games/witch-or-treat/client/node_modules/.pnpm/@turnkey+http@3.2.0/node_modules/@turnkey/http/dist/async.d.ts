import type { TurnkeyClient } from ".";
import { TActivityResponse } from "./shared";
/**
 * Wraps a request to create a fetcher with built-in async polling support.
 *
 * @deprecated this function only works with {@link TurnkeyApi}.
 * Use {@link TurnkeyClient} and {@link createActivityPoller} instead.
 */
export declare function withAsyncPolling<O extends TActivityResponse, I extends {
    body: unknown;
}>(params: {
    request: (input: I) => Promise<O>;
    refreshIntervalMs?: number;
}): (input: I) => Promise<O["activity"]>;
/**
 * Wraps a client request function (e.g. `client.createPrivateKeys`) in a poller.
 * The default refresh interval is 500ms.
 *
 * The returned poller will poll until the activity becomes `COMPLETED`.
 * If the activity becomes `FAILED` or `REJECTED` or is flagged as `NEEDS_CONSENSUS`, an error is thrown.
 *
 * @example
 * const activityPoller = createActivityPoller(client, client.createPrivateKeys);
 * const activity = await activityPoller(input);
 * console.log(activity.result); // activity is completed
 */
export declare function createActivityPoller<O extends TActivityResponse, I extends {}>(params: {
    client: TurnkeyClient;
    requestFn: (input: I) => Promise<O>;
    refreshIntervalMs?: number;
}): (input: I) => Promise<O["activity"]>;
//# sourceMappingURL=async.d.ts.map