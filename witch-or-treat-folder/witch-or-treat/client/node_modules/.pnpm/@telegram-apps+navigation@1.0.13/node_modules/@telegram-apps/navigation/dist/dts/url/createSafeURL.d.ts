import { URLLike } from './types.js';
/**
 * Safely creates a new instance of URL with some predefined protocol "http://" and host "a".
 * @param urlOrPath - URL instance or path.
 */
export declare function createSafeURL(urlOrPath: string | Partial<URLLike>): URL;
