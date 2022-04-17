import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useModal } from "./Modals/ModalUtils";
import { useMongo } from "./Mongo/MongoUtils";
import fastEqual from "fast-deep-equal";
import clsx from "clsx";

const noop = () => {};
export default function MyFilePicker({
    initialValue, // uploadcare doc
    onUpdate = noop,
    children,
}) {
    const { user } = useMongo();
    const { openModal } = useModal("file picker");
    const [file, setFile] = useState(initialValue);

    const prevFile = useRef(file);
    useEffect(() => {
        if (!fastEqual(prevFile.current, file)) {
            prevFile.current = file;
            onUpdate(file);
        }
    }, [file, onUpdate]);

    return (
        <div className="file-picker-wrapper">
            <label className="form-label">Image</label>
            <div
                onClick={() =>
                    openModal({
                        mode: "picker",
                        userId: user.id,
                        setFile,
                    })
                }
                className="inner"
            >
                {file?.value?.cdnUrl ? (
                    <div className="preview-image">
                        <Image
                            objectFit="cover"
                            layout="fill"
                            src={file.value.cdnUrl}
                            alt="drag n drop"
                        />
                    </div>
                ) : (
                    <Image
                        width="135w"
                        height="105.5w"
                        objectFit="contain"
                        layout="responsive"
                        src="/assets/img/photo.png"
                        alt="cute cate -  photo zone"
                    />
                )}
            </div>
        </div>
    );
}

export function MyFilePickerCreatePackField({
    initialValue, // uploadcare doc
    onUpdate = noop,
    className,
}) {
    const { user } = useMongo();
    const { openModal } = useModal("file picker");
    const [file, setFile] = useState(initialValue);
    useEffect(() => {
        setFile(initialValue);
    }, [initialValue]);

    const prevFile = useRef(file);
    useEffect(() => {
        if (!fastEqual(prevFile.current, file)) {
            prevFile.current = file;
            onUpdate(file);
        }
    }, [file, onUpdate]);

    // console.log(file, initialValue);

    return (
        <div
            className={clsx(className, "file-picker-wrapper-create-pack-field")}
        >
            <div
                onClick={() =>
                    openModal({
                        mode: "picker",
                        userId: user.id,
                        setFile,
                    })
                }
                className="inner"
            >
                {file?.value?.cdnUrl ? ( // next js image lags like crazy
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        width="85w"
                        height="76w"
                        src={file.value.cdnUrl}
                        alt="preview"
                    />
                ) : (
                    empty_svg
                )}
            </div>
        </div>
    );
}

const empty_svg = (
    <svg
        width="85"
        height="76"
        viewBox="0 0 85 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="85" height="76" rx="8" fill="#EBDDD2" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35 30C34.7348 30 34.4804 30.1054 34.2929 30.2929C34.1054 30.4804 34 30.7348 34 31V45C34 45.2652 34.1054 45.5196 34.2929 45.7071C34.4804 45.8946 34.7348 46 35 46H49C49.2652 46 49.5196 45.8946 49.7071 45.7071C49.8946 45.5196 50 45.2652 50 45V37C50 36.4477 50.4477 36 51 36C51.5523 36 52 36.4477 52 37V45C52 45.7957 51.6839 46.5587 51.1213 47.1213C50.5587 47.6839 49.7957 48 49 48H35C34.2044 48 33.4413 47.6839 32.8787 47.1213C32.3161 46.5587 32 45.7957 32 45V31C32 30.2044 32.3161 29.4413 32.8787 28.8787C33.4413 28.3161 34.2044 28 35 28H43C43.5523 28 44 28.4477 44 29C44 29.5523 43.5523 30 43 30H35Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36.7322 32.7322C37.2011 32.2634 37.837 32 38.5 32C39.163 32 39.7989 32.2634 40.2678 32.7322C40.7366 33.2011 41 33.837 41 34.5C41 35.163 40.7366 35.7989 40.2678 36.2678C39.7989 36.7366 39.163 37 38.5 37C37.837 37 37.2011 36.7366 36.7322 36.2678C36.2634 35.7989 36 35.163 36 34.5C36 33.837 36.2634 33.2011 36.7322 32.7322ZM38.5 34C38.3674 34 38.2402 34.0527 38.1464 34.1464C38.0527 34.2402 38 34.3674 38 34.5C38 34.6326 38.0527 34.7598 38.1464 34.8536C38.2402 34.9473 38.3674 35 38.5 35C38.6326 35 38.7598 34.9473 38.8536 34.8536C38.9473 34.7598 39 34.6326 39 34.5C39 34.3674 38.9473 34.2402 38.8536 34.1464C38.7598 34.0527 38.6326 34 38.5 34Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M45.2929 35.2929C45.6834 34.9024 46.3166 34.9024 46.7071 35.2929L51.7071 40.2929C52.0976 40.6834 52.0976 41.3166 51.7071 41.7071C51.3166 42.0976 50.6834 42.0976 50.2929 41.7071L46 37.4142L35.7071 47.7071C35.3166 48.0976 34.6834 48.0976 34.2929 47.7071C33.9024 47.3166 33.9024 46.6834 34.2929 46.2929L45.2929 35.2929Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M49 27C49.5523 27 50 27.4477 50 28V34C50 34.5523 49.5523 35 49 35C48.4477 35 48 34.5523 48 34V28C48 27.4477 48.4477 27 49 27Z"
            fill="#674433"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M45 31C45 30.4477 45.4477 30 46 30H52C52.5523 30 53 30.4477 53 31C53 31.5523 52.5523 32 52 32H46C45.4477 32 45 31.5523 45 31Z"
            fill="#674433"
        />
    </svg>
);
