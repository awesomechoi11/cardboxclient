import { useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Image from "next/image";
import { useUploadImage } from "../../UploadCare/useUpload";
import {
    AnimatePresence,
    motion,
    useMotionTemplate,
    useSpring,
    useTransform,
} from "framer-motion";
import {
    pickerIncomingFileItemRemover,
    pickerIncomingFileItemState,
} from "./PickerFlow.FileItemList";

export default function IncomingFileList({ refetch }) {
    const incomingFiles = useRecoilValue(pickerIncomingFileItemState);

    return (
        <>
            <motion.div className="file-item-list incoming" layout>
                <AnimatePresence exitBeforeEnter>
                    {incomingFiles.map((file, index) => (
                        <IncomingFileItem
                            {...file}
                            key={file.key}
                            index={index}
                            id={file.key}
                            refetch={refetch}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>
        </>
    );
}

function IncomingFileItem({ type, value, previewUrl, index, id, refetch }) {
    const removeIncomingFile = useSetRecoilState(pickerIncomingFileItemRemover);

    const progressValue = useSpring(0, { stiffness: 30 });
    const progressBarValue = useTransform(progressValue, (val) => val * 58 + 8);
    const progressBarWidth = useMotionTemplate`${progressBarValue}rem`;

    const uploadImage = useUploadImage();
    const { refetch: startUpload } = useQuery(
        id,
        () =>
            uploadImage(value, {
                // 58 is max width / 8 to 66 is 58 / 66 is width of bar
                onProgress: ({ value }) => progressValue.set(value),
            })
                // remove from array
                .then(() => removeIncomingFile(id))
                // refresh filelist
                .then(() => refetch()),
        {
            refetchOnWindowFocus: false,
            enabled: false, // turned off by default, manual refetch is needed
        }
    );
    const started = useRef(false);
    useEffect(() => {
        if (!started.current) {
            started.current = true;
            startUpload();
        }
    }, []);

    return (
        <motion.div
            className="file-item"
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
            key={id}
        >
            {type === "incomingUrl" && (
                <Image
                    width="82"
                    height="82"
                    src="https://ucarecdn.com/8367c6e0-2a0f-40c0-9bbb-7bf74754a3a5/"
                    alt="preview"
                    className="object-cover"
                />
            )}
            {type === "incoming" && (
                <>
                    {value.type.startsWith("image/") && (
                        <Image
                            width="82"
                            height="82"
                            src={previewUrl}
                            alt="preview"
                            className="object-cover"
                        />
                    )}
                    {value.type.startsWith("video/") && (
                        <video width="82" height="82" controls>
                            <source src={previewUrl} type={value.type} />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </>
            )}
            <motion.div
                className="progress-bar"
                initial={{
                    opacity: 0,
                }}
                transition={{
                    duration: 0.22,
                    ease: [0.2, 0, 0.33, 1],
                }}
                animate={{ opacity: 1 }}
            >
                <motion.div
                    className="bar"
                    style={{ width: progressBarWidth }}
                />
            </motion.div>
        </motion.div>
    );
}
