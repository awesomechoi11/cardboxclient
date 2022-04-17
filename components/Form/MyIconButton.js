import clsx from "clsx";

export default function MyIconButton({ className, ...props }) {
    return <div className={clsx("my-icon-button", className)} {...props} />;
}
