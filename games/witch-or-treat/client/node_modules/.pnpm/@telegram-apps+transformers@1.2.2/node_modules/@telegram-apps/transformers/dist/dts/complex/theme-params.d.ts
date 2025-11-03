import { ThemeParams } from '@telegram-apps/types';
import { TransformerGen } from '../types.js';
export declare const themeParams: TransformerGen<ThemeParams>;
/**
 * Serializes theme parameters to representation sent from the Telegram application.
 */
export declare function serializeThemeParams(themeParams: ThemeParams): string;
export type { ThemeParams };
