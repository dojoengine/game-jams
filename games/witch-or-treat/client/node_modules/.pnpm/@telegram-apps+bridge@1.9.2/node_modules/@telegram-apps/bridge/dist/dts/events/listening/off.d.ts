import { EventName } from '../types/events.js';
import { EventListener } from './types.js';
/**
 * Removes the listener from the specified event.
 * @param event - event to listen.
 * @param listener - event listener to remove.
 * @param once - had this listener to be called only once.
 */
export declare function off<E extends EventName>(event: E, listener: EventListener<E>, once?: boolean): void;
