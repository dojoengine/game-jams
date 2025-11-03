import { URLLike } from './types.js';
/**
 * Extracts path part from a URL.
 * @param urlOrPath - URL instance or path.
 */
export declare function urlToPath(urlOrPath: string | Partial<URLLike>): string;
