import { LaunchParams } from '@telegram-apps/types';
/**
 * @returns Launch parameters stored in the session storage.
 * @throws Error if function was unable to extract launch parameters from the window location hash.
 */
export declare function retrieveFromStorage(): LaunchParams;
/**
 * Saves specified launch parameters in the session storage.
 * @param value - launch params to save.
 */
export declare function saveToStorage(value: LaunchParams): void;
