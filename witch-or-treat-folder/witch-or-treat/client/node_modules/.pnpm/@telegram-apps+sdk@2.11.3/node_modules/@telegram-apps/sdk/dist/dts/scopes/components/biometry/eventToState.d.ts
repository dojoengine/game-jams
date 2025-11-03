import { EventPayload } from '@telegram-apps/bridge';
import { State } from './types.js';
/**
 * Converts `biometry_info_received` to some common shape.
 * @param event - event payload.
 * @see biometry_info_received
 */
export declare function eventToState(event: EventPayload<'biometry_info_received'>): State;
