/**
 * Returns the first navigation entry from window.performance.
 * @returns First navigation entry or null, in case performance functionality is not supported
 * or navigation entry was not found.
 */
export declare function getFirstNavigationEntry(): PerformanceNavigationTiming | undefined;
