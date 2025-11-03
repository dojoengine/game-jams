import { CancelablePromise } from './promises/CancelablePromise.js';
/**
 * Awaits for specified amount of time.
 * @param duration - duration in ms to await.
 * @param abortSignal - signal to stop function execution.
 */
export declare function sleep(duration: number, abortSignal?: AbortSignal): CancelablePromise<void>;
