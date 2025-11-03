const loadWindow = () => {
    if (typeof window !== "undefined") {
        return window;
    }
    else {
        return {
            localStorage: {
                getItem: (_key) => {
                    return null;
                },
                setItem: (_key, _value) => { },
                removeItem: (_key) => { },
                clear: () => { },
                key: (_index) => {
                    return null;
                },
                length: 0,
            },
            location: {
                hostname: "",
            },
        };
    }
};
var WindowWrapper = loadWindow();

export { WindowWrapper as default };
//# sourceMappingURL=window.mjs.map
