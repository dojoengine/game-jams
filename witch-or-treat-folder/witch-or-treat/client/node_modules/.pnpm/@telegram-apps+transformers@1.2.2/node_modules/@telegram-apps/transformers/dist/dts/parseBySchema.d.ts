import { Schema } from './types.js';
/**
 * Parses external value by specified schema. Functions iterates over each schema field
 * and uses getField function to get its value from the external source.
 * @param schema - object schema.
 * @param getField - function which gets external value by its field name.
 */
export declare function parseBySchema<T>(schema: Schema<T>, getField: (field: string) => unknown): T;
