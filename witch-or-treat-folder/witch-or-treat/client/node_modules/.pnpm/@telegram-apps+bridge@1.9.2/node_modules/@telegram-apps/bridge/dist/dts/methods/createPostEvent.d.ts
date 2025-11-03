import { Version } from '@telegram-apps/types';
import { PostEventFn } from './postEvent.js';
import { MethodName, MethodNameWithVersionedParams, MethodVersionedParams } from './types/index.js';
export type OnUnsupportedFn = (data: {
    version: Version;
} & ({
    method: MethodName;
} | {
    [M in MethodNameWithVersionedParams]: {
        method: M;
        param: MethodVersionedParams<M>;
    };
}[MethodNameWithVersionedParams])) => void;
export type CreatePostEventMode = 'strict' | 'non-strict';
/**
 * Creates a function which checks if specified method and parameters are supported.
 *
 * If method or parameters are unsupported, the `onUnsupported` function will be called.
 *
 * If `strict` or `non-strict` value was passed as the second argument, the function
 * will create its own `onUnsupported` function with behavior depending on the value passed.
 *
 * - Passing `strict` will make function to throw a `TypedError` error
 * with `ERR_METHOD_UNSUPPORTED` or `ERR_METHOD_PARAMETER_UNSUPPORTED` type.
 * - Passing `non-strict` will just warn you about something being unsupported.
 *
 * @param version - Telegram Mini Apps version.
 * @param onUnsupportedOrMode - function or strict mode. Default: `strict`
 */
export declare function createPostEvent(version: Version, onUnsupportedOrMode?: OnUnsupportedFn | CreatePostEventMode): PostEventFn;
