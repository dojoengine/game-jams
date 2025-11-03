import { RemoveListenerFn } from '@telegram-apps/signals';
import { SubscribeListener } from './types.js';
/**
 * Subscribes to all events sent from the native Telegram application.
 * @param listener - event listener to bind.
 * @param once - should this listener be called only once.
 * @returns Function to remove bound event listener.
 */
export declare function subscribe(listener: SubscribeListener, once?: boolean): RemoveListenerFn;
