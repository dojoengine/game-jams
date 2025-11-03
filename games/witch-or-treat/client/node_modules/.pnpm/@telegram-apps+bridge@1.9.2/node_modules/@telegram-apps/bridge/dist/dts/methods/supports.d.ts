import { Version } from '@telegram-apps/types';
import { MethodName, MethodNameWithVersionedParams, MethodVersionedParams } from './types/index.js';
/**
 * Returns true in case, passed parameter in specified method is supported.
 * @param method - method name
 * @param param - method parameter
 * @param inVersion - platform version.
 */
export declare function supports<M extends MethodNameWithVersionedParams>(method: M, param: MethodVersionedParams<M>, inVersion: Version): boolean;
/**
 * Returns true in case, specified method is supported in a passed version.
 * @param method - method name.
 * @param inVersion - platform version.
 */
export declare function supports(method: MethodName, inVersion: Version): boolean;
