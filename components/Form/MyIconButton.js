import clsx from "clsx";

export default function MyIconButton({ className, ...props }) {
    return (
        <div
            className={clsx(
                "my-icon-button flex justify-center cursor-pointer items-center p-1 rounded-full bg-blue-200 transition-colors hover:bg-blue-300",
                className
            )}
            {...props}
        />
    );
}
