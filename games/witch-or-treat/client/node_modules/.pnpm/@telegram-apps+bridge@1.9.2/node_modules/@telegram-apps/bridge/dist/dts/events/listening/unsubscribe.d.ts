import { SubscribeListenerFn } from '@telegram-apps/signals';
import { LastEvent } from './lastEvent.js';
/**
 * Remove a subscriber listening to all events sent from the native Telegram application.
 * @param listener - event listener to remove.
 * @param once - had this listener to be called only once.
 * @returns Function to remove bound event listener.
 */
export declare function unsubscribe(listener: SubscribeListenerFn<LastEvent | undefined>, once?: boolean): void;
