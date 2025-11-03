import { MethodNameWithOptionalParams, MethodNameWithoutParams, MethodNameWithRequiredParams, MethodParams } from './types/index.js';
export type PostEventFn = typeof postEvent;
/**
 * Calls Mini Apps methods requiring parameters.
 * @param method - method name.
 * @param params - options along with params.
 * @throws {TypedError} ERR_UNKNOWN_ENV
 */
export declare function postEvent<Method extends MethodNameWithRequiredParams>(method: Method, params: MethodParams<Method>): void;
/**
 * Calls Mini Apps methods accepting no parameters at all.
 * @param method - method name.
 * @throws {TypedError} ERR_UNKNOWN_ENV
 */
export declare function postEvent(method: MethodNameWithoutParams): void;
/**
 * Calls Mini Apps methods accepting optional parameters.
 * @param method - method name.
 * @param params - options along with params.
 * @throws {TypedError} ERR_UNKNOWN_ENV
 */
export declare function postEvent<Method extends MethodNameWithOptionalParams>(method: Method, params?: MethodParams<Method>): void;
