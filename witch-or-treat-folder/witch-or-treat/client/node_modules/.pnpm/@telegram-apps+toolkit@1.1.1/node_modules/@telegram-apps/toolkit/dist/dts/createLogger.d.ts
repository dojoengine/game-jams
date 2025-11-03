/**
 * Message log level.
 */
export type LogLevel = 'log' | 'error';
export interface LoggerOptions {
    bgColor?: string;
    textColor?: string;
    /**
     * Should return true if log should be outputted.
     * @default All logs will be outputted.
     */
    shouldLog?: boolean | (() => boolean);
}
export declare function createLogger(scope: string, options?: LoggerOptions): [
    /**
     * Prints log message into a console.
     * @param args
     */
    log: (...args: any[]) => void,
    /**
     * Prints error message into a console.
     * @param args
     */
    error: (...args: any[]) => void
];
