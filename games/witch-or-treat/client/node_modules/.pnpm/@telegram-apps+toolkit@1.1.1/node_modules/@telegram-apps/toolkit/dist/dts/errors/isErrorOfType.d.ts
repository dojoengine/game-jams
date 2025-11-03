import { TypedError } from './TypedError.js';
/**
 * @returns True, if the specified value is a TypedError of the specified type.
 * @param value - value to check.
 * @param type - error type.
 */
export declare function isErrorOfType<T extends string>(value: unknown, type: T): value is TypedError<T>;
