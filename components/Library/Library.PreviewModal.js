import { ModalWrapper, useModal } from "@components/Modals/ModalUtils";
import { ActiveOnViewportEnter } from "@components/general/ActiveOnViewportEnter";
import CardRow from "@components/CardPack/general/CardHorizontal";
import Button from "@components/general/Button";
import Text from "@components/general/Text";
import Link from "next/link";
import useDeletePackMutation from "@components/Mongo/CardPack/useDeletePackMutation";
import { usePopperTooltip } from "react-popper-tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { BULLET_POINTS } from "@components/Modals/FilePicker/_icons";
import { useIsMobile } from "@components/mediaQueryHooks";

export function LibraryPreviewModal() {
    return (
        <ModalWrapper
            modalId="library result preview"
            innerClassName="px-3 py-4 tablet:px-3 tablet:py-4 desktop:px-3 desktop:py-4 bg-blue-200 w-full tablet:w-[600px] desktop:w-[860px]"
        >
            <Inner />
        </ModalWrapper>
    )
}

function Inner() {
    const { data: { data, refetch }, closeModal } = useModal("library result preview");
    const isMobile = useIsMobile();
    const { title, cards, _id } = data;
    const deleteMutation = useDeletePackMutation({
        cardPackId: _id,
    });

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

    return (
        <div className="flex flex-col gap-4 text-left">
            <div className="flex flex-col gap-3 tablet:flex-row">
                <div className="flex-grow">
                    <div className="text-blue-950 text-[24px] font-semibold">

                        <Text>{title || "untitled"}</Text>
                    </div>
                    {/* <div>ratings here</div> */}
                </div>
                <div className="flex flex-row justify-end flex-shrink-0 gap-1 tablet:items-start">
                    {data.published &&
                        <Link
                            href={`/cardpack/${_id}`}
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            <Button className="w-full text-center">Study</Button>
                        </Link>}
                    {!isMobile && (
                        <>
                        {data.published &&
                            <Button variant="secondary"
                                onClick={() => {
                                    navigator.clipboard.writeText(`https://flippy.cards/cardpack/${_id}`);
                                }}
                            >Share
                            </Button>
                        }
                        <Link
                            href={`/editor/${_id}`}
                            onClick={() => {
                                closeModal();
                            }}
                        >
                            <Button variant="secondary">Edit</Button>
                        </Link>
                        </>   
                    )}
                    
                    <motion.div
                        className="cursor-pointer overflow-hidden bg-300 relative my-auto"
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
                        {BULLET_POINTS}
                    </motion.div>
                    <AnimatePresence>
                        {visible && (
                            <motion.div
                                ref={setTooltipRef}
                                {...getTooltipProps({
                                    className: "tooltip-container z-20 flex flex-col min-w-5 min-h-5 rounded-[3px]"
                                })}
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
                                        variant="danger"
                                        onClick={() => {
                                            deleteMutation.mutate(undefined, {
                                                onSuccess: () => {
                                                    toast.success(
                                                        "Your card pack was successfully deleted!"
                                                    );
                                                    refetch();
                                                    closeModal();
                                                },
                                            })

                                        }
                                        }
                                    >
                                        Delete
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {cards && cards.map(data => (
                    <ActiveOnViewportEnter key={data._id}>
                        <CardRow data={data} />
                    </ActiveOnViewportEnter>
                ))}
            </div>
            {data.published &&
                <Link
                    href={`/cardpack/${_id}`}
                    onClick={() => {
                        closeModal();
                    }}
                >
                    <Button className="w-full text-center">View Full Set</Button>
                </Link>}
        </div>
    );
}

