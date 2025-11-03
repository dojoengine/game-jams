import { Signal, SignalOptions } from './signal.js';
export interface Computed<T> extends Omit<Signal<T>, 'set' | 'reset'> {
    /**
     * @returns An underlying signal value.
     */
    (): T;
}
export declare function collectSignal(signal: Signal<any>): void;
/**
 * Creates a signal, which wil be automatically updated if some of its dependant signals were
 * modified.
 * @param fn - computation function.
 * @param options - additional functions.
 */
export declare function computed<T>(fn: (prev?: T) => T, options?: SignalOptions<T>): Computed<T>;
