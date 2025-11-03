export type CallbackFn = () => void;
/**
 * Returns a tuple, containing function to add cleanup, call cleanup, and flag showing whether
 * cleanup was called. Cleanup will not be performed in case, it was done before.
 */
export declare function createCbCollector(...cbs: (CallbackFn | CallbackFn[])[]): [
    add: (...fns: CallbackFn[]) => void,
    call: () => void
];
