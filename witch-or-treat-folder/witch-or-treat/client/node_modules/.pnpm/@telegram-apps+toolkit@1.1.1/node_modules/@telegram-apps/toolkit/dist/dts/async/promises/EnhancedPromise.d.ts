import { AsyncOptions } from '../types.js';
import { CancelablePromise } from './CancelablePromise.js';
import { PromiseExecutorFn, PromiseOnRejectedFn, PromiseOnFulfilledFn, PromiseResolveFn } from './types.js';
import { Maybe } from '../../types/misc.js';
export declare class EnhancedPromise<Result, Resolvable = Result> extends CancelablePromise<Result> {
    /**
     * Creates a new EnhancedPromise instance using executor, resolving promise when a result
     * was returned.
     * @param fn - function returning promise result.
     * @param options - additional options.
     */
    static withFn<T>(fn: (abortSignal: AbortSignal) => (T | PromiseLike<T>), options?: AsyncOptions): EnhancedPromise<T>;
    /**
     * @see Promise.resolve
     */
    static resolve<Resolvable>(): EnhancedPromise<void, Resolvable>;
    /**
     * @see Promise.resolve
     */
    static resolve<Result, Resolvable = Result>(value: Result): EnhancedPromise<Result, Resolvable>;
    /**
     * @see Promise.reject
     */
    static reject<Result = never, Resolvable = Result>(reason?: any): EnhancedPromise<Result, Resolvable>;
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
     * @see Promise.catch
     */
    catch<CatchResult = never>(onRejected?: Maybe<PromiseOnRejectedFn<CatchResult>>): EnhancedPromise<Result | CatchResult, Resolvable>;
    /**
     * @see Promise.finally
     */
    finally(onFinally?: Maybe<() => void>): EnhancedPromise<Result, Resolvable>;
    /**
     * Resolves the promise.
     */
    resolve: PromiseResolveFn<Resolvable>;
    /**
     * @see Promise.then
     */
    then<A = Result, B = never>(onFulfilled?: Maybe<PromiseOnFulfilledFn<Result, A>>, onRejected?: Maybe<PromiseOnRejectedFn<B>>): EnhancedPromise<A | B, Resolvable>;
}
