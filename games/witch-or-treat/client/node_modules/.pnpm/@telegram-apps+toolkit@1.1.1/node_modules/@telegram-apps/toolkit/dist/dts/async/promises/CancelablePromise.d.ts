import { Maybe } from '../../types/misc.js';
import { AsyncOptions } from '../types.js';
import { PromiseExecutorFn, PromiseOnRejectedFn, PromiseRejectFn, PromiseOnFulfilledFn } from './types.js';
/**
 * Improved version of the JavaScript Promise.
 */
export declare class CancelablePromise<Result> extends Promise<Result> {
    /**
     * Creates a new BetterPromise instance using executor, resolving promise when a result
     * was returned.
     * @param fn - function returning promise result.
     * @param options - additional options.
     */
    static withFn<T>(fn: (abortSignal: AbortSignal) => (T | PromiseLike<T>), options?: AsyncOptions): CancelablePromise<T>;
    /**
     * @see Promise.resolve
     */
    static resolve(): CancelablePromise<void>;
    /**
     * @see Promise.resolve
     */
    static resolve<T>(value: T | PromiseLike<T>): CancelablePromise<Awaited<T>>;
    /**
     * @see Promise.reject
     */
    static reject<T = never>(reason?: any): CancelablePromise<T>;
    /**
     * Creates a new BetterPromise instance using only options.
     * @param options - additional options.
     */
    constructor(options?: AsyncOptions);
    /**
     * Creates a new BetterPromise instance using specified executor and additional options.
     * @param executor - promise executor.
     * @param options - additional options.
     */
    constructor(executor?: PromiseExecutorFn<Result>, options?: AsyncOptions);
    /**
     * Cancels the promise execution.
     */
    cancel(): void;
    /**
     * @see Promise.catch
     */
    catch<CatchResult = never>(onRejected?: Maybe<PromiseOnRejectedFn<CatchResult>>): CancelablePromise<Result | CatchResult>;
    /**
     * @see Promise.finally
     */
    finally(onFinally?: Maybe<() => void>): CancelablePromise<Result>;
    /**
     * Rejects the promise.
     */
    reject: PromiseRejectFn;
    /**
     * @see Promise.then
     */
    then<A = Result, B = never>(onFulfilled?: Maybe<PromiseOnFulfilledFn<Result, A>>, onRejected?: Maybe<PromiseOnRejectedFn<B>>): CancelablePromise<A | B>;
}
