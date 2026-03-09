import { Link } from "@inertiajs/react";

export default function LinkButton({
    href,
    children,
    variant = "primary",
    size = "md",
    className = "",
    fullWidth = false,
    ...props
}) {
    const baseStyles =
        "inline-flex items-center justify-center gap-3 font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-3 focus:ring-offset-2 hover:scale-[1.02] active:scale-[0.98] select-none no-underline";

    const variants = {
        primary:
            "bg-dark-green text-light-green border-2 border-dark-green hover:bg-dark-green/90 hover:shadow-xl hover:shadow-dark-green/25 focus:ring-dark-green/50",
        secondary:
            "bg-light-green text-dark-green border-2 border-light-green hover:bg-light-green/90 hover:shadow-xl hover:shadow-light-green/25 focus:ring-light-green/50",
        outline:
            "bg-transparent text-dark-green border-2 border-dark-green hover:bg-dark-green hover:text-light-green hover:shadow-lg focus:ring-dark-green/50",
        ghost: "bg-transparent text-dark-green hover:bg-light-green/30 border-0 hover:shadow-md focus:ring-dark-green/50",
    };

    const sizes = {
        sm: "px-4 py-2.5 text-sm min-h-[36px]",
        md: "px-5 py-3.5 text-sm min-h-[48px]",
        lg: "px-6 py-4 text-base min-h-[52px]",
        xl: "px-8 py-5 text-lg min-h-[60px]",
    };

    return (
        <Link
            href={href}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
                fullWidth ? "w-full" : ""
            } ${className}`}
            {...props}
        >
            {children}
        </Link>
    );
}
