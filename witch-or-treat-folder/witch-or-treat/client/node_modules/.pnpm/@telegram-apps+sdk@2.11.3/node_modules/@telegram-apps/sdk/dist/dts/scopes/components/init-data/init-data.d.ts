import { Computed } from '@telegram-apps/signals';
import { InitData } from '@telegram-apps/bridge';
/**
 * Complete component state.
 */
export declare const state: import('@telegram-apps/signals').Signal<InitData | undefined>;
/**
 * @see InitData.authDate
 */
export declare const authDate: Computed<Date | undefined>;
/**
 * @see InitData.canSendAfter
 */
export declare const canSendAfter: Computed<number | undefined>;
/**
 * Date after which it is allowed to call
 * the [answerWebAppQuery](https://core.telegram.org/bots/api#answerwebappquery) method.
 */
export declare const canSendAfterDate: Computed<Date | undefined>;
/**
 * @see InitData.chat
 */
export declare const chat: Computed<import('@telegram-apps/bridge').Chat | undefined>;
/**
 * @see InitData.chatType
 */
export declare const chatType: Computed<string | undefined>;
/**
 * @see InitData.chatInstance
 */
export declare const chatInstance: Computed<string | undefined>;
/**
 * @see InitData.hash
 */
export declare const hash: Computed<string | undefined>;
/**
 * @see InitData.queryId
 */
export declare const queryId: Computed<string | undefined>;
/**
 * Raw representation of init data.
 */
export declare const raw: import('@telegram-apps/signals').Signal<string | undefined>;
/**
 * @see InitData.receiver
 */
export declare const receiver: Computed<import('@telegram-apps/bridge').User | undefined>;
/**
 * Restores the component state.
 */
export declare function restore(): void;
/**
 * @see InitData.startParam
 */
export declare const startParam: Computed<string | undefined>;
/**
 * @see InitData.user
 */
export declare const user: Computed<import('@telegram-apps/bridge').User | undefined>;
