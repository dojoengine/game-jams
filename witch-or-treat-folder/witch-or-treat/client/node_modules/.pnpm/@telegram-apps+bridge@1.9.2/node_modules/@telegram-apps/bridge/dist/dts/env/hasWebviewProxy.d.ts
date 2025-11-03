interface WithWebviewProxy {
    TelegramWebviewProxy: {
        postEvent: (...args: unknown[]) => unknown;
    };
}
/**
 * Returns true in case, passed value contains path `TelegramWebviewProxy.postEvent` property and
 * `postEvent` is a function.
 * @param value - value to check.
 */
export declare function hasWebviewProxy<T>(value: T): value is T & WithWebviewProxy;
export {};
