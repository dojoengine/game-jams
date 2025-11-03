export declare function addEventListener<E, L extends (...args: any[]) => any>(obj: {
    addEventListener(type: E, listener: L): void;
    removeEventListener(type: E, listener: L): void;
}, type: E, listener: L): () => void;
