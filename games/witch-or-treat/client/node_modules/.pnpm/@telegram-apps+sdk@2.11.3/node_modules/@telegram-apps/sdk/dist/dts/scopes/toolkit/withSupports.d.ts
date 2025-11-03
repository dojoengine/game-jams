import { MethodNameWithVersionedParams, MethodVersionedParams } from '@telegram-apps/bridge';
type HasCheckSupportMethodTuple<FnArgs extends any[]> = {
    [M in MethodNameWithVersionedParams]: [
        method: M,
        parameter: MethodVersionedParams<M>,
        shouldCheck: (...args: FnArgs) => boolean
    ];
}[MethodNameWithVersionedParams];
export type WithSupports<F extends (...args: any) => any, S extends Record<string, unknown>> = F & {
    /**
     * @returns True, if this function is supported.
     */
    supports(method: keyof S): boolean;
};
/**
 * Adds the "supports" method to the passed function returning true, if specified action is
 * supported by the current Mini Apps version.
 *
 * Wrapped function throws an error in case, the passed arguments are subject to check for one
 * of the schema properties.
 * @param fn - function to extend.
 * @param schema - map where key is an action name and value is a tuple containing Mini Apps
 * method name and its option.
 */
export declare function withSupports<F extends (...args: any) => any, S extends Record<string, HasCheckSupportMethodTuple<Parameters<F>>>>(fn: F, schema: S): WithSupports<F, S>;
export {};
