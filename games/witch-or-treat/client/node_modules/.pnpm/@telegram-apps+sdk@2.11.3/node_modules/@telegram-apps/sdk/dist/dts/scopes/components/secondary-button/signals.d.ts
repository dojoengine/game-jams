import { Computed } from '@telegram-apps/signals';
import { State } from './types.js';
export declare const internalState: import('@telegram-apps/signals').Signal<State>;
/**
 * Complete component state.
 */
export declare const state: Computed<Required<State>>;
/**
 * True if the component is currently mounted.
 */
export declare const isMounted: import('@telegram-apps/signals').Signal<boolean>;
/**
 * @see State.backgroundColor
 */
export declare const backgroundColor: Computed<`#${string}`>;
/**
 * @see State.hasShineEffect
 */
export declare const hasShineEffect: Computed<boolean>;
/**
 * @see State.isEnabled
 */
export declare const isEnabled: Computed<boolean>;
/**
 * @see State.isLoaderVisible
 */
export declare const isLoaderVisible: Computed<boolean>;
/**
 * @see State.isVisible
 */
export declare const isVisible: Computed<boolean>;
/**
 * @see State.position
 */
export declare const position: Computed<import('@telegram-apps/bridge').SecondaryButtonPosition>;
/**
 * @see State.text
 */
export declare const text: Computed<string>;
/**
 * @see State.textColor
 */
export declare const textColor: Computed<`#${string}`>;
