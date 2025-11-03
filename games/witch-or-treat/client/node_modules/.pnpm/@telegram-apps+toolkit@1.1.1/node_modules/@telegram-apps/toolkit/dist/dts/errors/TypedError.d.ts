export interface TypedErrorOptions {
    message?: string;
    cause?: unknown;
}
export declare class TypedError<T extends string> extends Error {
    readonly type: T;
    constructor(type: T, options?: TypedErrorOptions);
    constructor(type: T, message?: string, cause?: unknown);
}
