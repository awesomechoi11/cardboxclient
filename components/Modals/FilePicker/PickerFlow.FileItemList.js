import { useEffect, useState } from "react";
import { useModal } from "../ModalUtils";
import { useMongo } from "../../Mongo/MongoUtils";
import { useQuery } from "react-query";
import { atom, selector } from "recoil";
import Image from "next/image";
import { FIRST_SVG, LAST_SVG, NEXT_SVG, PREV_SVG } from "./_icons";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import IncomingFileList from "./PickerFlow.FileItemList.IncomingFileList";
import { usePaginationator } from "../../utils";
import { usePopperTooltip } from "react-popper-tooltip";
import Button from "@components/general/Button";
import PlaceholderColumn from "../../PlaceholderColumn";
import useDeleteFileMutation from "../../Mongo/Files/useDeleteFileMutation";
import { toast } from "react-toastify";
import { normalizeImageSrc } from "@components/general/NormalizedImage";

export const pickerIncomingFileItemState = atom({
    key: "pickerIncomingFileItemState",
    default: [],
});
export const pickerIncomingFileItemRemover = selector({
    key: "pickerIncomingFileItemSelector",
    get: ({ get }) => get(pickerIncomingFileItemState),
    set: ({ set, get }, removeId) => {
        const currentArr = get(pickerIncomingFileItemState).slice();
        set(
            pickerIncomingFileItemState,
            currentArr.filter((file) => removeId !== file.key)
        );
    },
});

export default function FileItemList() {
    const { db, user } = useMongo();
    const { isLoading, isError, isSuccess, isIdle, data, refetch } = useQuery(
        ["file-item-list", user.id],
        () =>
            db.collection("files").findOne({
                userId: user.id,
            }),
        { refetchOnWindowFocus: false, enabled: !!db }
    );

    /**
     * file object structure
     * type: str ["uploadcare","incoming",etc]
     * value: object {any}
     */

    return (
        <>
            {(isIdle || isLoading) && <PlaceholderColumn presetKey="loading" />}
            {isError && <PlaceholderColumn presetKey="error" />}
            {isSuccess &&
                !!data?.files?.length &&
                (() => {
                    let files = data.files.map((file, index) => (
                        <FileItem
                            file={file}
                            key={file.value.uuid}
                            index={index}
                            refetch={refetch}
                        />
                    ));
                    return <PaginatedList files={files.reverse()} />;
                })()}
            <IncomingFileList refetch={refetch} />
        </>
    );
}

function PaginatedList({ files }) {
    const { first, last, prev, next, items, current, setCurrentPage } =
        usePaginationator(files);

    const [Locked, setLocked] = useState(false);

    useEffect(() => {
        if (Locked) {
            const timeoutId = setTimeout(() => {
                setLocked(false);
            }, 120); // manually waits for anim to finish/ otherwise weried buggos!!
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [Locked]);

    return (
        <>
            <div className="file-item-list flex flex-wrap overflow-hidden h-[300px] gap-4 mb-4 ">
                <AnimatePresence mode="wait">{items}</AnimatePresence>
            </div>
            <div className="controls flex justify-around items-center">
                <div
                    className={clsx(
                        first && current !== first && "active cursor-pointer hover:bg-blue-400",
                        "icon-btn transition-colors w-5 h-5 flex items-center justify-center rounded-full",
                        "first"
                    )}
                    onClick={() => {
                        if (first && current !== first && !Locked) {
                            setLocked(true);
                            setCurrentPage(first - 1);
                        }
                    }}
                >
                    {FIRST_SVG}
                </div>
                <div
                    className={clsx(prev && "active cursor-pointer hover:bg-blue-400", "icon-btn transition-colors w-5 h-5 flex items-center justify-center rounded-full", "prev")}
                    onClick={() => {
                        if (prev && !Locked) {
                            setLocked(true);
                            setCurrentPage(prev - 1);
                        }
                    }}
                >
                    {PREV_SVG}
                </div>
                <div className="mx-2 my-0 font-bold text-blue-600">
                    {current}
                </div>
                <div
                    className={clsx(next && "active cursor-pointer hover:bg-blue-400", "icon-btn transition-colors w-5 h-5 flex items-center justify-center rounded-full", "next")}
                    onClick={() => {
                        if (next && !Locked) {
                            setLocked(true);
                            setCurrentPage(next - 1);
                        }
                    }}
                >
                    {NEXT_SVG}
                </div>
                <div
                    className={clsx(
                        last && current !== last && "active cursor-pointer hover:bg-blue-400",
                        "icon-btn transition-colors w-5 h-5 flex items-center justify-center rounded-full",
                        "last"
                    )}
                    onClick={() => {
                        if (last && current !== last && !Locked) {
                            setLocked(true);
                            setCurrentPage(last - 1);
                        }
                    }}
                >
                    {LAST_SVG}
                </div>
            </div>
        </>
    );
}

function FileItem({ file, index, refetch }) {
    const { type, value } = file;
    let previewUrl = normalizeImageSrc(file);

    const isVideo = value.mimeType.startsWith("video/");
    const isImage = value.mimeType.startsWith("image/");

    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({
        delayHide: 440,
        interactive: true,
        trigger: "click",
        // visible: true,
        mutationObserverOptions: {
            attributes: false,
            childList: true,
            subtree: false,
        },
        placement: "bottom",
    });
    const {
        data: { setFile },
        closeModal,
    } = useModal("file picker");

    const deleteFileMutation = useDeleteFileMutation({ type, value });

    return (
        <>
            <motion.div
                className="file-item cursor-pointer overflow-hidden w-9 h-9 rounded-xl bg-300 relative"
                initial={{
                    opacity: 0,
                    scale: 0.9,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                exit={{
                    opacity: 0,
                    scale: 0.9,
                    transitionDuration: 0.1,
                }}
                transition={{
                    duration: 0.11,
                    ease: [0.2, 0, 0.33, 1],
                }}
                layout
                ref={setTriggerRef}
            >
                {isImage && (
                    <Image
                        width={82}
                        height={82}
                        src={previewUrl}
                        alt="preview"
                        className="object-cover"
                        style={{height: "inherit"}}
                    />

                )}
                {isVideo && (
                    <video width="82" height="82" controls>
                        <source src={previewUrl} type={value.mimeType} />
                        Your browser does not support the video tag.
                    </video>
                )}
            </motion.div>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        ref={setTooltipRef}
                        {...getTooltipProps({ 
                            className: "tooltip-container z-20 flex flex-col min-w-5 min-h-5 rounded-[3px]" })}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.18,
                        }}
                    >
                        <div {...getArrowProps({ className: "tooltip-arrow h-[1rem] w-[1rem] pointer-events-none justify-center" })}>
                            <motion.svg
                                width="32"
                                height="8"
                                viewBox="0 0 32 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                initial={{
                                    y: "10",
                                }}
                                animate={{
                                    y: "0",
                                }}
                                exit={{
                                    y: "10",
                                }}
                                transition={{
                                    duration: 0.18,
                                }}
                            >
                                <path
                                    d="M16 0C12 0 8 8 0 8L32 8C24 8 20 0 16 0Z"
                                    fill="#C0D8FD"
                                />
                            </motion.svg>
                        </div>
                        <motion.div
                            className="inner flex flex-col z-40 p-1 bg-blue-400 rounded-sm"
                            initial={{
                                y: "10",
                            }}
                            animate={{
                                y: "0",
                            }}
                            exit={{
                                y: "10",
                            }}
                            transition={{
                                duration: 0.18,
                            }}
                        >
                            <Button
                                variant="tertiary"
                                size="sm"
                                onClick={() => {
                                    setFile({ type, value });
                                    closeModal();
                                }}
                            >
                                Use
                            </Button>
                            <Button variant="tertiary" size="sm">
                                Edit
                            </Button>
                            <Button
                                variant="tertiary"
                                size="sm"
                                onClick={() => {
                                    deleteFileMutation.mutate(undefined, {
                                        onSuccess: () => {
                                            refetch();
                                            toast.success(
                                                "File successfully deleted!"
                                            );
                                        },
                                    });
                                }}
                            >
                                Delete
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
