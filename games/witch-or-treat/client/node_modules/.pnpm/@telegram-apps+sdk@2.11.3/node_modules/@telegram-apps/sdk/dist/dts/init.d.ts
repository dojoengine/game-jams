import { ConfigureOptions } from './scopes/globals.js';
export interface InitOptions extends ConfigureOptions {
    /**
     * True if SDK should accept styles sent from the Telegram application.
     * @default true
     */
    acceptCustomStyles?: boolean;
}
/**
 * Initializes the SDK allowing it to properly handle events, sent from the native Telegram
 * application.
 * @param options - function options.
 * @returns A function, to perform a cleanup.
 */
export declare function init(options?: InitOptions): VoidFunction;
