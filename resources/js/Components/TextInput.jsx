import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={
                "appearance-none outline-none rounded-full text-sm px-5 py-3.5 font-semibold border border-gray-300 shadow-sm focus:border-light-green focus:ring-light-green placeholder:text-gray-400 placeholder:font-medium transition-all duration-300 " +
                className
            }
            ref={localRef}
        />
    );
});
