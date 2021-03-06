import clsx from "clsx";
import Button from "@components/general/Button";
import Image from "next/image";
import Link from "next/link";
const imageObj = {
    studyCat: {
        src: "/assets/placeholdercolumn/Study Cat.png",
        alt: "studyCat",
    },
    oopsCat: {
        src: "/assets/placeholdercolumn/oops cat.png",
        alt: "oops cat",
    },
    watchPaw: {
        src: "/assets/placeholdercolumn/Watch paw.png",
        alt: "watch paw",
    },
    vaseHeartCat: {
        src: "/assets/placeholdercolumn/General/Frame 54.png",
        alt: "cute vase cat with heart",
    },
    catOnBook: {
        src: "/assets/placeholdercolumn/Frame 7.png",
        alt: "cat on book",
    },
};

const sizes = {
    regular: {
        width: "360rem",
    },
};
const presets = {
    error: {
        imageKey: "oopsCat",
        message: {
            title: "Something went wrong...",
            description: (
                <>
                    Try refreshing! If it keeps persisting please reach out to
                    us on{" "}
                    <Link href="https://discord.gg/QC3yHFySAV">
                        <a target="_blank" className="subtitle-2">
                            discord
                        </a>
                    </Link>
                    !
                </>
            ),
        },
    },
    loading: {
        imageKey: "watchPaw",
        message: {
            title: "Loading",
            description: "please wait a short while...",
        },
    },
};

export default function PlaceholderColumn({
    options = {
        sizeKey: "regular",
        imageKey: "studyCat",
        presetKey: undefined,
        message: undefined,
        action: undefined,
        actionComponent: undefined,
    },
    presetKey,
    className,
    ...props
}) {
    if (presetKey) {
        Object.assign(options, presets[presetKey]);
    }
    const image = imageObj[options.imageKey];
    const size = sizes[options.sizeKey];
    const message = options.message;
    const actionComponent = options.actionComponent;
    const action = options.action;
    return (
        <div className={clsx(className, "placeholder-column", options.sizeKey)}>
            {image && (
                <div className="img-wrapper">
                    <Image
                        alt={image.alt}
                        src={image.src}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
            )}
            {message && (
                <div className="message">
                    <div className="title-1">{message.title}</div>
                    <div className="description-1">{message.description}</div>
                </div>
            )}
            {actionComponent}
            {action && <Button {...action.props}>{action.label}</Button>}
        </div>
    );
}
