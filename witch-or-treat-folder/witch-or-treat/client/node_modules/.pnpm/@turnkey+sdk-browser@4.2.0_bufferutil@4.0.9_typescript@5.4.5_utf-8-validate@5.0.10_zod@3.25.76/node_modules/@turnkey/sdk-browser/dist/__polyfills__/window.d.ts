declare const _default: (Window & typeof globalThis) | {
    localStorage: {
        getItem: (_key: string) => string | null;
        setItem: (_key: string, _value: string) => void;
        removeItem: (_key: string) => void;
        clear: () => void;
        key: (_index: number) => string | null;
        length: number;
    };
    location: {
        hostname: string;
    };
};
export default _default;
//# sourceMappingURL=window.d.ts.map