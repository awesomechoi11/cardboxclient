import { AnimatePresence, motion } from "framer-motion";
import { usePopperTooltip } from "react-popper-tooltip";

export function MyClickTooltip({
    tooltipOptions = {
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
    },
    TooltipContent,
    TriggerContent,
}) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip(tooltipOptions);

    return (
        <>
            <div className="tooltip-trigger-wrapper" ref={setTriggerRef}>
                {TriggerContent}
            </div>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        ref={setTooltipRef}
                        {...getTooltipProps({ className: "tooltip-container" })}
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
                        <div {...getArrowProps({ className: "tooltip-arrow" })}>
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
                                    fill="#F9F5F1"
                                />
                            </motion.svg>
                        </div>
                        <motion.div
                            className="inner"
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
                            {TooltipContent}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/**
 * 
    use it like this!!

    <MyHoverTooltip
        TriggerContent={
            <button className="icon-btn">
                <div className="icon">{DUPLICATE_SVG}</div>
                <div className="content">{millify(duplciates)}</div>
            </button>
        }
        TooltipContent={<div>Duplicate</div>}
    />

 */

export function MyHoverTooltip({
    tooltipOptions = {
        // delayHide: 40,
        // interactive: true,
        trigger: "hover",
        // visible: true,
        offset: [0, 14],
        mutationObserverOptions: {
            attributes: false,
            childList: true,
            subtree: false,
        },
        placement: "bottom",
    },
    TooltipContent,
    TriggerContent,
}) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip(tooltipOptions);

    return (
        <>
            <div className="tooltip-trigger-wrapper" ref={setTriggerRef}>
                {TriggerContent}
            </div>
            <AnimatePresence>
                {visible && (
                    <motion.div
                        ref={setTooltipRef}
                        {...getTooltipProps({ className: "tooltip-container" })}
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
                        <div {...getArrowProps({ className: "tooltip-arrow" })}>
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
                                    fill="#F9F5F1"
                                />
                            </motion.svg>
                        </div>
                        <motion.div
                            className="inner normal-1"
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
                            {TooltipContent}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
