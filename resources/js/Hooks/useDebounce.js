import React from "react";

export function useDebounce(value, delay = 500) {
    const [debounceValue, setDebounceValue] = React.useState(value);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debounceValue;
}
