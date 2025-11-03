/**
 * Saves value in the storage.
 * @param key - storage key.
 * @param value - storage value.
 */
export declare function setStorageValue<T>(key: string, value: T): void;
/**
 * Extracts value from the storage.
 * @param key - storage key.
 */
export declare function getStorageValue<R>(key: string): R | undefined;
