import { LaunchParams } from '@telegram-apps/types';
import { TransformerGen } from '../types.js';
export declare const launchParams: TransformerGen<LaunchParams>;
/**
 * Serializes launch parameters to representation sent from the Telegram
 * application.
 */
export declare function serializeLaunchParams(lp: LaunchParams): string;
export type { LaunchParams };
