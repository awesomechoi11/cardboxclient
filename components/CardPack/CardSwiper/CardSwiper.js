import clsx from "clsx";
import { motion, useIsomorphicLayoutEffect } from "framer-motion";
import { createRef } from "react";
import { useRecoilState } from "recoil";
import { useIsMobile } from "../../mediaQueryHooks";
import { MyHoverTooltip } from "../../Tooltip/MyClickTooltip";
import { cardsMapState } from "../CardPackUtils";
import CardStack from "./CardStack";
import { CardSwiperContext, useCardSwiperControls } from "./_CardSwiperUtils";

export default function CardSwiper({ data, className, ...props }) {
    const [cardsMap, setCardsMap] = useRecoilState(
        cardsMapState("CardSwiper" + data._id)
    );
    useIsomorphicLayoutEffect(() => {
        setCardsMap(data.cards.map((_, index) => index));
    }, [data.cards]);
    const isMobile = useIsMobile();
    return (
        <CardSwiperContext.Provider value={data}>
            <div
                className={clsx(
                    "card-swiper-wrapper",
                    isMobile && "mobile",
                    className
                )}
                {...props}
            >
                <div className="dropzone-wrapper" ref={DragDropRef} />
                {cardsMap?.length && isMobile ? <MobileCardUI /> : <CardUI />}
                <CardStack />
            </div>
        </CardSwiperContext.Provider>
    );
}

export const DragDropRef = createRef();

function CardUI() {
    const {
        increment,
        decrement,
        shuffle,
        cardsMap,
        cardIndex,
        flipDefaultSide,
    } = useCardSwiperControls();

    return (
        <div className="controls">
            <div className="left">
                <motion.div
                    className="arrow"
                    onClick={() => decrement()}
                    style={{
                        y: "205",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    <svg
                        style={{
                            width: "32",
                            height: "32",
                        }}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="right"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.4933 8.34151C19.857 8.75715 19.8149 9.38891 19.3992 9.75259L12.2593 16L19.3992 22.2474C19.8149 22.6111 19.857 23.2429 19.4933 23.6585C19.1296 24.0742 18.4978 24.1163 18.0822 23.7526L10.5122 17.1289C9.82926 16.5313 9.82926 15.4688 10.5122 14.8711L18.0822 8.24744C18.4978 7.88375 19.1296 7.92587 19.4933 8.34151Z"
                            fill="#674433"
                        />
                    </svg>
                </motion.div>
                <motion.div
                    className="flipsides"
                    onClick={() => flipDefaultSide()}
                    style={{
                        y: "376",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    <MyHoverTooltip
                        TooltipContent="Swap Front & Back"
                        TriggerContent={
                            <svg
                                style={{
                                    width: "48",
                                    height: "48",
                                }}
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M31.0385 10.5L37.5 16.5M37.5 16.5L31.0385 22.5M37.5 16.5L16.5 16.5M16.9615 37.5L10.5 31.5M10.5 31.5L16.9615 25.5M10.5 31.5L31.5 31.5"
                                    stroke="#674433"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                    />
                </motion.div>
            </div>
            <div className="middle">
                {cardsMap && cardsMap.length && (
                    <motion.div className="counter" style={{ y: "446" }}>
                        {(((cardIndex % cardsMap.length) + cardsMap.length) %
                            cardsMap.length) +
                            1}
                        /{cardsMap.length}
                    </motion.div>
                )}
            </div>
            <div className="right">
                <motion.div
                    className="arrow"
                    onClick={() => increment()}
                    style={{
                        y: "205",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    <svg
                        style={{
                            width: "32",
                            height: "32",
                        }}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.2474 23.6585C11.8838 23.2429 11.9259 22.6111 12.3415 22.2474L19.4814 16L12.3415 9.75256C11.9259 9.38888 11.8838 8.75712 12.2474 8.34148C12.6111 7.92585 13.2429 7.88373 13.6585 8.24741L21.2285 14.8711C21.9115 15.4687 21.9115 16.5312 21.2285 17.1289L13.6585 23.7526C13.2429 24.1162 12.6111 24.0741 12.2474 23.6585Z"
                            fill="#674433"
                        />
                    </svg>
                </motion.div>
                <motion.div
                    className="shuffle"
                    onClick={() => shuffle()}
                    style={{
                        y: "376",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    <MyHoverTooltip
                        TooltipContent="Shuffle Stack"
                        TriggerContent={
                            <svg
                                style={{
                                    width: "48",
                                    height: "48",
                                }}
                                width="48"
                                height="48"
                                viewBox="0 0 48 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.1103 13.2534C9.93341 12.1869 10.6672 11.1809 11.7494 11.0066L29.8734 8.08663C30.9555 7.91229 31.9761 8.63558 32.153 9.70213L36.3166 34.8073C36.4935 35.8738 35.7596 36.8798 34.6775 37.0541L16.5535 39.9741C15.4714 40.1484 14.4508 39.4251 14.2739 38.3586L10.1103 13.2534Z"
                                    fill="#9E694F"
                                />
                                <path
                                    d="M15.7499 9.70498C15.8911 8.63328 16.8871 7.87732 17.9744 8.01652L36.186 10.3478C37.2733 10.487 38.0403 11.4686 37.8991 12.5403L34.5749 37.7668C34.4337 38.8385 33.4377 39.5944 32.3504 39.4552L14.1388 37.124C13.0515 36.9848 12.2845 36.0032 12.4257 34.9315L15.7499 9.70498Z"
                                    fill="#E2B082"
                                />
                            </svg>
                        }
                    />
                </motion.div>
            </div>
        </div>
    );
}

function MobileCardUI() {
    const {
        increment,
        decrement,
        shuffle,
        cardsMap,
        cardIndex,
        flipDefaultSide,
    } = useCardSwiperControls();

    return (
        <div className="controls">
            <div className="left">
                <motion.div
                    className="arrow"
                    onClick={() => decrement()}
                    style={{
                        y: "466",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    <svg
                        style={{
                            width: "32",
                            height: "32",
                        }}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="right"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M19.4933 8.34151C19.857 8.75715 19.8149 9.38891 19.3992 9.75259L12.2593 16L19.3992 22.2474C19.8149 22.6111 19.857 23.2429 19.4933 23.6585C19.1296 24.0742 18.4978 24.1163 18.0822 23.7526L10.5122 17.1289C9.82926 16.5313 9.82926 15.4688 10.5122 14.8711L18.0822 8.24744C18.4978 7.88375 19.1296 7.92587 19.4933 8.34151Z"
                            fill="#674433"
                        />
                    </svg>
                </motion.div>
                <motion.div
                    className="flipsides"
                    onClick={() => flipDefaultSide()}
                    style={{
                        y: "546",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    <svg
                        style={{
                            width: "48",
                            height: "48",
                        }}
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M31.0385 10.5L37.5 16.5M37.5 16.5L31.0385 22.5M37.5 16.5L16.5 16.5M16.9615 37.5L10.5 31.5M10.5 31.5L16.9615 25.5M10.5 31.5L31.5 31.5"
                            stroke="#674433"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            </div>
            <div className="middle">
                {cardsMap && cardsMap.length && (
                    <motion.div className="counter" style={{ y: "466" }}>
                        {(((cardIndex % cardsMap.length) + cardsMap.length) %
                            cardsMap.length) +
                            1}
                        /{cardsMap.length}
                    </motion.div>
                )}
            </div>
            <div className="right">
                <motion.div
                    className="arrow"
                    onClick={() => increment()}
                    style={{
                        y: "466",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    <svg
                        style={{
                            width: "32",
                            height: "32",
                        }}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.2474 23.6585C11.8838 23.2429 11.9259 22.6111 12.3415 22.2474L19.4814 16L12.3415 9.75256C11.9259 9.38888 11.8838 8.75712 12.2474 8.34148C12.6111 7.92585 13.2429 7.88373 13.6585 8.24741L21.2285 14.8711C21.9115 15.4687 21.9115 16.5312 21.2285 17.1289L13.6585 23.7526C13.2429 24.1162 12.6111 24.0741 12.2474 23.6585Z"
                            fill="#674433"
                        />
                    </svg>
                </motion.div>
                <motion.div
                    className="shuffle"
                    onClick={() => shuffle()}
                    style={{
                        y: "546",
                    }}
                    whileHover={{
                        scale: 1.1,
                    }}
                >
                    <svg
                        style={{
                            width: "48",
                            height: "48",
                        }}
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.1103 13.2534C9.93341 12.1869 10.6672 11.1809 11.7494 11.0066L29.8734 8.08663C30.9555 7.91229 31.9761 8.63558 32.153 9.70213L36.3166 34.8073C36.4935 35.8738 35.7596 36.8798 34.6775 37.0541L16.5535 39.9741C15.4714 40.1484 14.4508 39.4251 14.2739 38.3586L10.1103 13.2534Z"
                            fill="#9E694F"
                        />
                        <path
                            d="M15.7499 9.70498C15.8911 8.63328 16.8871 7.87732 17.9744 8.01652L36.186 10.3478C37.2733 10.487 38.0403 11.4686 37.8991 12.5403L34.5749 37.7668C34.4337 38.8385 33.4377 39.5944 32.3504 39.4552L14.1388 37.124C13.0515 36.9848 12.2845 36.0032 12.4257 34.9315L15.7499 9.70498Z"
                            fill="#E2B082"
                        />
                    </svg>
                </motion.div>
            </div>
        </div>
    );
}
/**
 *                             <MyHoverTooltip
            TooltipContent={<>Delete Row</>}
            TriggerContent={
                <MyIconButton
                    onClick={() => {
                        setData({
                            action: "remove",
                        });
                    }}
                    variant="secondary"
                >
                    {trash_svg}
                </MyIconButton>
            }
        />
 */
