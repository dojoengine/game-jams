/**
 * The package debug mode.
 *
 * Enabling debug mode leads to printing additional messages in the console related to the
 * processes inside the package.
 */
export declare const $debug: import('@telegram-apps/signals').Signal<boolean>;
export declare const logInfo: (...args: any[]) => void, logError: (...args: any[]) => void;
