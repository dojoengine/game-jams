import { TransformerGen, TransformFn } from '../types.js';
export declare function array<T>(of: TransformFn<T>, name?: string): TransformerGen<T[]>;
