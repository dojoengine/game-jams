import { TypedError } from './TypedError.js';
export declare function createTypedErrorPredicate<T extends string>(type: T): (value: unknown) => value is TypedError<T>;
