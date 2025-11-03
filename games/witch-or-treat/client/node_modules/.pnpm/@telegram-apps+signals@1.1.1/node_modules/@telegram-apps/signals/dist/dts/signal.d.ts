export type SubscribeListenerFn<T> = (current: T, previous: T) => void;
export type RemoveListenerFn = () => void;
export interface SignalOptions<T> {
    /**
     * Previous and next values comparator.
     *
     * This function is used during the actual and incoming values comparison in the `set` method.
     * If values are considered the same, no subscribers will be called.
     *
     * @default Object.is
     * @param current - the actual value.
     * @param next - an incoming value.
     * @returns True if values are considered the same.
     */
    equals?: (current: T, next: T) => boolean;
}
export interface SubOptions {
    /**
     * Should the listener be called only once.
     */
    once?: boolean;
    /**
     * Was this listener added by other signal.
     */
    signal?: boolean;
}
export interface Signal<T> {
    /**
     * @returns An underlying signal value.
     */
    (): T;
    /**
     * Destroys the signal removing all bound listeners.
     *
     * We usually use this method when the signal is not needed anymore.
     *
     * Take note that as long as call of this method removes all bound listeners, computed signals
     * based on the current one will stop listening to its changes, possibly making it work
     * improperly.
     */
    destroy: () => void;
    /**
     * Resets the signal to its initial value.
     */
    reset: () => void;
    /**
     * Updates the signal notifying all subscribers about changes.
     * @param value - value to set.
     */
    set: (value: T) => void;
    /**
     * Adds a new listener, tracking the signal changes.
     * @param fn - event listener.
     * @param onceOrOptions - was this listener added for a single call, or additional
     * options.
     * @returns A function to remove the bound listener.
     */
    sub: (fn: SubscribeListenerFn<T>, onceOrOptions?: boolean | SubOptions) => RemoveListenerFn;
    /**
     * Removes a listener, tracking the signal changes.
     * @param fn - event listener.
     * @param onceOrOptions - was this listener added for a single call, or additional
     * options. Default: false
     */
    unsub: (fn: SubscribeListenerFn<T>, onceOrOptions?: boolean | SubOptions) => void;
    /**
     * Remove all non-signal listeners.
     */
    unsubAll: () => void;
}
/**
 * Creates a new signal with initial value.
 * @param initialValue - initial value.
 * @param options - additional options.
 */
export declare function signal<T>(initialValue: T, options?: SignalOptions<T>): Signal<T>;
/**
 * Creates a new signal without initial value.
 * @param initialValue
 * @param options - additional options.
 */
export declare function signal<T>(initialValue?: T, options?: SignalOptions<T | undefined>): Signal<T | undefined>;
