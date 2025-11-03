import { ThemeParams } from '@telegram-apps/bridge';
import { Computed } from '@telegram-apps/signals';
/**
 * True if the component is currently mounted.
 */
export declare const isMounted: import('@telegram-apps/signals').Signal<boolean>;
/**
 * True if CSS variables are currently bound.
 */
export declare const isCssVarsBound: import('@telegram-apps/signals').Signal<boolean>;
/**
 * Complete component state.
 */
export declare const state: import('@telegram-apps/signals').Signal<ThemeParams>;
/**
 * @since v6.10
 */
export declare const accentTextColor: Computed<`#${string}` | undefined>;
export declare const backgroundColor: Computed<`#${string}` | undefined>;
export declare const buttonColor: Computed<`#${string}` | undefined>;
export declare const buttonTextColor: Computed<`#${string}` | undefined>;
/**
 * @since v7.10
 */
export declare const bottomBarBgColor: Computed<`#${string}` | undefined>;
export declare const destructiveTextColor: Computed<`#${string}` | undefined>;
/**
 * @since v6.10
 */
export declare const headerBackgroundColor: Computed<`#${string}` | undefined>;
export declare const hintColor: Computed<`#${string}` | undefined>;
/**
 * @returns True if the current color scheme is recognized as dark.
 * This value is calculated based on the current theme's background color.
 */
export declare const isDark: Computed<boolean>;
export declare const linkColor: Computed<`#${string}` | undefined>;
export declare const secondaryBackgroundColor: Computed<`#${string}` | undefined>;
/**
 * @since v6.10
 */
export declare const sectionBackgroundColor: Computed<`#${string}` | undefined>;
/**
 * @since v6.10
 */
export declare const sectionHeaderTextColor: Computed<`#${string}` | undefined>;
/**
 * @since v7.6
 */
export declare const sectionSeparatorColor: Computed<`#${string}` | undefined>;
/**
 * @since v6.10
 */
export declare const subtitleTextColor: Computed<`#${string}` | undefined>;
export declare const textColor: Computed<`#${string}` | undefined>;
