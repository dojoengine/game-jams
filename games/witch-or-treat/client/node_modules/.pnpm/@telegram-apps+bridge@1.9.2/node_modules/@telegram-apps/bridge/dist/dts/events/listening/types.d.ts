import { If, IsNever } from '@telegram-apps/toolkit';
import { SubscribeListenerFn } from '@telegram-apps/signals';
import { EventName, EventPayload } from '../types/index.js';
import { LastEvent } from './lastEvent.js';
/**
 * Event listener for specified event.
 */
export type EventListener<E extends EventName> = SubscribeListenerFn<SignalPayload<E>>;
export type SubscribeListener = SubscribeListenerFn<LastEvent | undefined>;
export type SignalPayload<E extends EventName> = If<IsNever<EventPayload<E>>, undefined, EventPayload<E>>;
