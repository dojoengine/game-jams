import { LaunchParams } from '@telegram-apps/types';
/**
 * @returns Launch parameters from the current window location hash.
 * @throws Error if function was unable to extract launch parameters from the window location hash.
 */
export declare function retrieveFromLocation(): LaunchParams;
