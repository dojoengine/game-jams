import { If, IsNever } from '@telegram-apps/toolkit';
import { Signal } from '@telegram-apps/signals';
import { EventPayload, EventName } from '../types/events.js';
export type LastEvent = {
    [E in EventName]: [E, If<IsNever<EventPayload<E>>, undefined, EventPayload<E>>];
}[EventName];
/**
 * Last received event.
 */
export declare const $lastEvent: Signal<LastEvent | undefined>;
/**
 * Side effects listening cleanup function. It will be eventually set when some code tried
 * to retrieve the last event.
 */
export declare const $lastEventCleanup: Signal<(() => void) | undefined>;
/**
 * Retrieve last received Mini Apps event ensuring that external listeners were defined.
 */
export declare function lastEventSignal(): Signal<LastEvent | undefined>;
