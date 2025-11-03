import { TypedError } from '../errors/TypedError.js';
export declare const ERR_ABORTED = "ERR_ABORTED";
export declare const ERR_CANCELED = "ERR_CANCELED";
export declare const ERR_TIMED_OUT = "ERR_TIMED_OUT";
export declare function createAbortError(cause?: unknown): TypedError<typeof ERR_ABORTED>;
export declare const isTimeoutError: (value: unknown) => value is TypedError<"ERR_TIMED_OUT">;
export declare const isAbortError: (value: unknown) => value is TypedError<"ERR_ABORTED">;
export declare const isCanceledError: (value: unknown) => value is TypedError<"ERR_CANCELED">;
