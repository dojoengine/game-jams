type BaseErrorParameters = {
    docsPath?: string | undefined;
    docsSlug?: string | undefined;
    metaMessages?: string[] | undefined;
} & ({
    cause?: never | undefined;
    details?: string | undefined;
} | {
    cause: BaseError | Error | undefined;
    details?: never | undefined;
});
export type BaseErrorType = BaseError & {
    name: 'ViemError';
};
export declare class BaseError extends Error {
    details: string;
    docsPath?: string | undefined;
    metaMessages?: string[] | undefined;
    shortMessage: string;
    name: string;
    version: string;
    constructor(shortMessage: string, args?: BaseErrorParameters);
    walk(): Error;
    walk(fn: (err: unknown) => boolean): Error | null;
}
export {};
//# sourceMappingURL=base.d.ts.map