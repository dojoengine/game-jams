import { RemoveListenerFn } from '@telegram-apps/signals';
import { EventName } from '../types/events.js';
import { EventListener } from './types.js';
/**
 * Adds a new listener to the specified event.
 * @param event - event name.
 * @param listener - event listener.
 * @param once - should listener be called only once.
 * @returns Function to remove bound event listener.
 */
export declare function on<E extends EventName>(event: E, listener: EventListener<E>, once?: boolean): RemoveListenerFn;
