import { Signal } from './signal.js';
export declare function runInBatchMode(signal: Signal<any>, fn: () => void): void;
/**
 * Runs the specified function in the batch mode.
 *
 * It makes all signals' subscribers to be called only after signals changes inside the specified
 * function were applied.
 * @param fn - function to run in the batch mode.
 * @example
 * const a = signal(1);
 * const b = signal(1);
 * const c = computed(() => a() + b());
 *
 * function subscriber(value) {
 *   console.log(value);
 * }
 *
 * c.sub(subscriber);
 *
 * batch(() => {
 *   a.set(2);
 *   a.set(3);
 *   b.set(2);
 *   b.set(3);
 * });
 *
 * // Despite the fact that we called signals setters four times, the `subscriber` function will
 * // be called only once. Removing the `batch` function usage will lead to calling the `subscriber`
 * // function four times.
 */
export declare function batch(fn: () => void): void;
