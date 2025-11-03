import { TransformerGen, TransformFn } from '../types.js';
/**
 * Creates transformer generator using the passed transform function as a base.
 * @param transform - transform function.
 * @param name - custom transformer name.
 */
export declare function createTransformerGen<T>(name: string, transform: TransformFn<T>): TransformerGen<T>;
