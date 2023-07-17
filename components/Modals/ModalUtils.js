import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { atomFamily, useRecoilState, useResetRecoilState } from "recoil";
import FilePickerModal from "./FilePicker/_FilePickerModal";
import LoginModal from "./Login/LoginModal";
import PublishModal from "./PublishModal/_PublishModal";
import { SearchResultPreviewModal } from "@components/Search/Search.ResultCard";
import Button from "@components/general/Button";
import { twMerge } from "tailwind-merge";
import { ImageViewerModal } from "./ImageViewer/ImageViewer";
import { MobileDropdownModal } from "@components/nav/Navbar";

export default function ModalRoot() {
    return (
        <div
            id="modal-root"
            className="absolute top-0 z-20 w-full h-full overflow-hidden pointer-events-none"
        >
            <SearchResultPreviewModal />
            <PublishModal />
            <ImageViewerModal />
            <FilePickerModal />
            <LoginModal />
            <MobileDropdownModal />
        </div>
    );
}

export const modalOpenState = atomFamily({
    key: "modalOpenState",
    default: false,
});
export const modalState = atomFamily({
    key: "modalState",
    default: null,
});

export function useModal(modalId) {
    const [isOpen, setOpen] = useRecoilState(modalOpenState(modalId));
    const [data, setModalData] = useRecoilState(modalState(modalId));
    const resetModalData = useResetRecoilState(modalState(modalId));
    return {
        toggle: (data) => {
            setOpen(!isOpen);
            if (data) setModalData(data);
        },
        openModal: (data) => {
            setOpen(true);
            if (data) setModalData(data);
        },
        closeModal: (data) => {
            setOpen(false);
            if (data) setModalData(data);
        },
        resetModalData,
        isOpen,
        data,
        setModalData,
    };
}

export function ModalWrapper({
    modalId,
    children,
    className,
    innerClassName,
    ...props
}) {
    const { toggle, isOpen } = useModal(modalId);
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    styke={{
                        WebkitOverflowScrolling: "touch",
                    }}
                    className="absolute inset-0 z-10 overflow-y-auto opacity-0 pointer-events-auto bg-blue-900/75 "
                    initial={{ opacity: 0, pointerEvents: "none" }}
                    animate={{ opacity: 1, pointerEvents: "all" }}
                    exit={{ opacity: 0, pointerEvents: "none" }}
                    transition={{
                        duration: 0.22,
                        ease: [0.2, 0, 0.33, 1],
                    }}
                >
                    <div
                        className={twMerge(
                            "z-10 absolute",
                            "cursor-pointer w-full min-h-full p-1 tablet:p-4 desktop:p-10 flex items-center flex-col box-border ",
                            className
                        )}
                        {...props}
                        onClick={() => toggle()}
                    >
                        <div
                            className={twMerge(
                                "text-center break-words border-box cursor-auto relative bg-blue-200 rounded-xl ",
                                "px-1 py-5 my-8 w-full",
                                "tablet:w-[600px] tablet:py-8 tablet:px-6",
                                "desktop:py-11 desktop:px-10 desktop:m-auto ",
                                innerClassName
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <Button
                                size="roundedDefault"
                                variant="secondary"
                                className="absolute right-0 items-center justify-center hidden transition bg-blue-100 cursor-pointer translate-x-9 hover:scale-110 linear duration-600 desktop:block "
                                onClick={() => toggle()}
                            >
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289Z"
                                        fill="#144B9F"
                                    />
                                </svg>
                            </Button>
                            {children}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
