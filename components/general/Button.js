import clsx from "clsx";

const buttonVariants = {
    primary: [
        // default
        "font-semibold",
        "bg-blue-800",
        "text-brown-50",
        //hover
        "hover:bg-blue-700",
        "hover:text-brown-50",
        //disabled
        "disabled:bg-blue-200",
        "disabled:text-blue-400",
        //active
        "active:bg-blue-700",
        "active:text-brown-50",
    ],
    create: [
        "font-semibold",
        "bg-blue-800",
        "text-brown-50",
        //hover
        "hover:bg-blue-400",
        "hover:text-brown-50",
        //disabled
        "disabled:bg-blue-200",
        "disabled:text-brown-300",
        //active
        "active:bg-blue-400",
        "active:text-brown-50",
    ],

    danger: [
        // default
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
        "font-semibold",
        "bg-transparent",
        "text-blue-800",
        //hover
        "hover:bg-blue-300",
        "hover:text-blue-800",
        //disabled
        "disabled:bg-blue-50",
        "disabled:text-blue-400",
        //active
        "active:bg-blue-300",
        "active:text-blue-800",
    ],

    pink: [
        "font-semibold",
        "bg-pink-600",
        "text-brown-50",
        //hover
        "hover:bg-pink-400",
        "hover:text-brown-50",
        //disabled
        "disabled:bg-pink-50",
        "disabled:text-black",
        //active
        "active:bg-pink-400",
        "active:text-brown-50",
    ],

    yellow: [
        "font-semibold",
        "bg-yellow-400",
        "text-black",
        //hover
        "hover:bg-yellow-300",
        "hover:text-black",
        //disabled
        "disabled:bg-yellow-50",
        "disabled:text-black",
        //active
        "active:bg-yellow-300",
        "active:text-black",
    ],

    cyan: [
        "font-semibold",
        "bg-cyan-400",
        "text-black",
        //hover
        "hover:bg-cyan-300",
        "hover:text-black",
        //disabled
        "disabled:bg-cyan-50",
        "disabled:text-black",
        //active
        "active:bg-cyan-300",
        "active:text-black",
    ],
};
const sizeVariants = {
    roundedSm: ["text-base rounded-full px-2 py-2 "],
    sm: ["text-base rounded-sm px-3 py-2 "],
    default: ["text-base rounded px-4 py-3 "],
    xs: ["text-base rounded px-1 py-1 h-6"],
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
                "transition ease-in-out duration-180 active:scale-95 disabled:pointer-events-none"
            )}
        >
            {children}
        </button>
    );
}
