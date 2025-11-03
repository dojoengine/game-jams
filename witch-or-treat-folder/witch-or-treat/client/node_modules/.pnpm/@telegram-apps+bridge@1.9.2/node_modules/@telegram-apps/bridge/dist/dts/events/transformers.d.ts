import { TransformerGen } from '@telegram-apps/transformers';
import { EventName, EventPayload } from './types/events.js';
/**
 * Transformers for problematic Mini Apps events.
 */
export declare const transformers: {
    [E in EventName]?: TransformerGen<EventPayload<E>>;
};
