import clsx from "clsx";

export default function Text({ children, className, ...props }) {
    return (
        <span {...props} className={clsx("", className)}>
            {children}
        </span>
    );
}
