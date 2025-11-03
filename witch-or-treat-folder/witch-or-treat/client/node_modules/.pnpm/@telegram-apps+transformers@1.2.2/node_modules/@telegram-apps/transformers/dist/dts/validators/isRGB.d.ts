import { RGB } from '@telegram-apps/types';
/**
 * Returns true in case, passed value has #RRGGBB format.
 * @param value - value to check.
 */
export declare function isRGB(value: string): value is RGB;
