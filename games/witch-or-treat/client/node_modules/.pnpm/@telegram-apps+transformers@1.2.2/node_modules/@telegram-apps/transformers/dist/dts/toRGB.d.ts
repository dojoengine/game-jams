import { RGB } from '@telegram-apps/types';
/**
 * Converts passed value to #RRGGBB format. Accepts following color formats:
 * - `#RGB`
 * - `#RRGGBB`
 * - `rgb(1,2,3)`
 * - `rgba(1,2,3,4)`
 * @param value - value to convert.
 * @throws {Error} Passed value does not satisfy any of known RGB formats.
 */
export declare function toRGB(value: string): RGB;
