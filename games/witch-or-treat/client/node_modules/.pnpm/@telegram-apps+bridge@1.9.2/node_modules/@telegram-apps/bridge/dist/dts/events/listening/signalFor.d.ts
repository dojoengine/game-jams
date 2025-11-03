import { Signal } from '@telegram-apps/signals';
import { EventName } from '../types/events.js';
import { SignalPayload } from './types.js';
type CachedSignal<E extends EventName> = Signal<SignalPayload<E>>;
type Cache = {
    [E in EventName]?: CachedSignal<E>;
};
export declare const $eventSignalsCache: Signal<Cache>;
/**
 * Returns a signal for specified event using cache.
 * @param event - event name.
 */
export declare function signalFor<E extends EventName>(event: E): CachedSignal<E>;
export {};
