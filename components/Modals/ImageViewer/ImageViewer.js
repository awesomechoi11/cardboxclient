import Image from "next/image";
import { ModalWrapper, useModal } from "../ModalUtils";
import { twMerge } from "tailwind-merge";
import { normalizeImageSrc } from "@components/general/NormalizedImage";
import { motion } from "framer-motion";

export default function ImageViewer({ className, innerClassName, imgData }) {
    const imgSrc = normalizeImageSrc(imgData);
    const { openModal } = useModal("image viewer");
    return (
        <div
            className={twMerge(
                className,
                "relative  rounded-lg overflow-hidden"
            )}
        >
            <motion.div
                className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-blue-900 bg-opacity-75 cursor-pointer"
                initial={{ opacity: 0, scale: 1 }}
                whileHover={{
                    opacity: 1,
                    scale: 1.55,
                }}
                onClick={() => {
                    openModal(imgData);
                }}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                        stroke="#EFF5FE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M21.0004 21.0004L16.6504 16.6504"
                        stroke="#EFF5FE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11 8V14"
                        stroke="#EFF5FE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M8 11H14"
                        stroke="#EFF5FE"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>

            <Image
                className={twMerge(innerClassName)}
                src={imgSrc}
                alt={imgData.alt}
                width={200}
                height={150}
                style={{
                    objectFit: "contain",
                }}
            />
        </div>
    );
}

export function ImageViewerModal() {
    const { data } = useModal("image viewer");
    const imgSrc = normalizeImageSrc(data);

    return (
        <ModalWrapper
            modalId="image viewer"
            innerClassName="px-0 py-0 rounded-none tablet:px-0 tablet:py-0 desktop:px-0 desktop:py-0"
        >
            <Image
                src={imgSrc}
                alt="modal image"
                height={0}
                width={0}
                unoptimized
                style={{
                    height: "auto",
                    // width: "600px",
                }}
                className="w-full tablet:w-[600px]"
            />
        </ModalWrapper>
    );
}
