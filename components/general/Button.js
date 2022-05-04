import clsx from "clsx";

const buttonVariants = {
    primary: [
        // default
        "rounded-lg",
        "font-semibold",
        "bg-brown-600",
        "text-brown-50",
        //hover
        "hover:bg-brown-400",
        "hover:text-brown-50",
        //disabled
        "disabled:bg-brown-200",
        "disabled:text-brown-300",
        //active
        "active:bg-brown-400",
        "active:text-brown-50",
    ],
    danger: [
        // default
        "rounded-lg",
        "font-semibold",
        "bg-rose-600",
        "text-rose-100",
        //hover
        "hover:bg-rose-800",
        //disabled
        "disabled:bg-rose-400",
        "disabled:text-brown-300",
        //active
        "active:bg-rose-600",
        "active:text-rose-100",
    ],
    secondary: [
        "rounded-lg",
        "font-semibold",
        "bg-transparent",
        "text-brown-600",
        //hover
        "hover:bg-brown-400",
        "hover:text-brown-50",
        //disabled
        "disabled:bg-brown-50",
        "disabled:text-brown-200",
        //active
        "active:bg-brown-400",
        "active:text-brown-50",
    ],
};
const sizeVariants = {
    sm: ["text-sm rounded-sm px-3 py-2 "],
    default: ["text-base rounded px-4 py-3 "],
};
export default function Button({
    variant = "primary",
    size = "default",
    children,
    className,
    ...props
}) {
    return (
        <button
            {...props}
            className={clsx(
                buttonVariants[variant],
                sizeVariants[size],
                className,
                "ease-in-out duration-180"
            )}
        >
            {children}
        </button>
    );
}
