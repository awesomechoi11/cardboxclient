import clsx from "clsx";
import { useIsomorphicLayoutEffect } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { MyHoverTooltip } from "../../Tooltip/MyClickTooltip";
import { cardsMapState } from "../CardPackUtils";
import CardGrid from "./CardGrid";
import CardRow from "./CardRow";
import {
    CardDisplayContext,
    useCardDisplayControls,
} from "./_CardDisplayUtils";

export default function CardDisplay({ data }) {
    const setCardsMap = useSetRecoilState(
        cardsMapState("CardDisplay" + data._id)
    );
    useIsomorphicLayoutEffect(() => {
        setCardsMap(data.cards.map((_, index) => index));
    }, [data.cards]);
    return (
        <div className="card-display">
            <CardDisplayContext.Provider value={data}>
                <CardDisplayInner />
            </CardDisplayContext.Provider>
        </div>
    );
}

function CardDisplayInner() {
    const {
        shuffle,
        flipDefaultSide,
        cardDisplayMode,
        setCardDisplayMode,
        resetCards,
    } = useCardDisplayControls();
    return (
        <>
            <div className="controls">
                <div className="left">
                    {/* <div className="icon-button">{number_svg}</div> */}
                    {/* <div className="icon-button">{atoz_svg}</div> */}
                    <div className="icon-button" onClick={() => shuffle()}>
                        <MyHoverTooltip
                            TooltipContent="Shuffle Cards"
                            TriggerContent={shuffle_svg}
                        />
                    </div>
                    <div
                        className="icon-button"
                        onClick={() => flipDefaultSide()}
                    >
                        <MyHoverTooltip
                            TooltipContent="Flip Default Side"
                            TriggerContent={flip_svg}
                        />
                    </div>
                    <div className="icon-button" onClick={() => resetCards()}>
                        <MyHoverTooltip
                            TooltipContent="Flip All To Default Side"
                            TriggerContent={reset_svg}
                        />
                    </div>
                </div>
                <div className="right">
                    {/* <div
                        className={clsx("icon-button", cardDisplayMode === 'row' && 'active')}
                        onClick={() => setCardDisplayMode("row")}
                    >
                        {row_svg}
                    </div> */}
                    <div
                        className={clsx(
                            "icon-button",
                            cardDisplayMode === "grid" && "active"
                        )}
                        onClick={() => setCardDisplayMode("grid")}
                    >
                        <MyHoverTooltip
                            TooltipContent="Grid View"
                            TriggerContent={grid_svg}
                        />
                    </div>
                </div>
            </div>
            <div className="break-words">
                {cardDisplayMode === "grid" && <CardGrid />}
                {cardDisplayMode === "row" && <CardRow />}
            </div>
        </>
    );
}

const number_svg = (
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
            d="M24.4824 20L20.4824 24M20.4824 24L16.4824 20M20.4824 24L20.4824 8"
            stroke="#674433"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M11.9717 7V14.7639H10.099V8.75143H10.0535L8.31723 9.81291V8.19037L10.2317 7H11.9717Z"
            fill="#674433"
        />
        <path
            d="M7.63106 25V23.6504L10.4629 21.1711C10.6752 20.979 10.8559 20.8034 11.005 20.6442C11.1541 20.4824 11.2679 20.3207 11.3462 20.1589C11.4246 19.9946 11.4637 19.8165 11.4637 19.6244C11.4637 19.4096 11.417 19.2263 11.3235 19.0747C11.23 18.9205 11.1011 18.8018 10.9368 18.7183C10.7725 18.6349 10.5842 18.5932 10.3719 18.5932C10.1571 18.5932 9.96883 18.6375 9.80709 18.7259C9.64534 18.8119 9.51897 18.937 9.42799 19.1012C9.33953 19.2655 9.2953 19.4652 9.2953 19.7002H7.51733C7.51733 19.172 7.63612 18.7158 7.87369 18.3317C8.11125 17.9475 8.44486 17.6518 8.8745 17.4446C9.30668 17.2348 9.80835 17.1299 10.3795 17.1299C10.9684 17.1299 11.4802 17.2285 11.9149 17.4256C12.3496 17.6228 12.6857 17.8982 12.9233 18.2521C13.1634 18.6034 13.2834 19.0115 13.2834 19.4765C13.2834 19.7722 13.224 20.0654 13.1052 20.3561C12.9865 20.6467 12.7729 20.9677 12.4646 21.319C12.1588 21.6703 11.7241 22.0911 11.1605 22.5814L10.2317 23.4381V23.4874H13.3782V25H7.63106Z"
            fill="#674433"
        />
    </svg>
);

const atoz_svg = (
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
            d="M9.66392 15H7.66332L10.2618 7.29845H12.74L15.3386 15H13.338L11.5291 9.23888H11.469L9.66392 15ZM9.39693 11.969H13.5786V13.383H9.39693V11.969ZM8.45256 24V22.9395L12.1943 17.8102H8.45633V16.2984H14.5484V17.3589L10.8067 22.4883H14.5446V24H8.45256Z"
            fill="#674433"
        />
        <path
            d="M25 20L21 24M21 24L17 20M21 24L21 8"
            stroke="#674433"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const shuffle_svg = (
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
            d="M21 14L25 10.5M25 10.5L21 7M25 10.5C11 8.5 22 21.9999 7 22M21 25L25 21.5M25 21.5L21 18M25 21.5C11 24.5 22 10.0001 7 10"
            stroke="#674433"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const flip_svg = (
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
            d="M20.6923 7L25 11M25 11L20.6923 15M25 11L11 11M11.3077 25L7 21M7 21L11.3077 17M7 21L21 21"
            stroke="#674433"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const reset_svg = (
    <svg
        style={{
            width: "32",
            height: "32",
        }}
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M26.2396 12.6202C26.5066 12.1368 26.331 11.5284 25.8476 11.2614C25.3641 10.9945 24.7558 11.17 24.4888 11.6534L26.2396 12.6202ZM22.4729 17.3729L21.8584 18.1618C22.0892 18.3416 22.3872 18.4113 22.6738 18.3525C22.9604 18.2937 23.2068 18.1124 23.3483 17.8563L22.4729 17.3729ZM18.1144 12.711C17.6787 12.3717 17.0504 12.4498 16.711 12.8856C16.3717 13.3213 16.4498 13.9496 16.8856 14.289L18.1144 12.711ZM18.2618 23.1336L17.8088 22.2421L17.8088 22.2421L18.2618 23.1336ZM7.50556 19.6261L8.39704 19.173L8.39704 19.173L7.50556 19.6261ZM11.0131 8.86982L10.56 7.97833L10.56 7.97833L11.0131 8.86982ZM21.7693 12.3773L22.6608 11.9243L22.6608 11.9243L21.7693 12.3773ZM24.4888 11.6534L21.5974 16.8895L23.3483 17.8563L26.2396 12.6202L24.4888 11.6534ZM23.0873 16.5839L18.1144 12.711L16.8856 14.289L21.8584 18.1618L23.0873 16.5839ZM17.8088 22.2421C14.3623 23.9936 10.1485 22.6195 8.39704 19.173L6.61407 20.0791C8.86597 24.5103 14.2837 26.277 18.7149 24.0251L17.8088 22.2421ZM8.39704 19.173C6.64557 15.7266 8.01965 11.5128 11.4661 9.7613L10.56 7.97833C6.12885 10.2302 4.36218 15.6479 6.61407 20.0791L8.39704 19.173ZM11.4661 9.7613C14.9126 8.00983 19.1264 9.3839 20.8779 12.8304L22.6608 11.9243C20.4089 7.4931 14.9912 5.72643 10.56 7.97833L11.4661 9.7613ZM20.8779 12.8304C21.5846 14.2211 21.7448 15.7401 21.488 17.1996L23.4577 17.5462C23.7806 15.7112 23.5862 13.7453 22.6608 11.9243L20.8779 12.8304ZM18.9944 21.4825C18.6331 21.769 18.2374 22.0243 17.8088 22.2421L18.7149 24.0251C19.2633 23.7464 19.7716 23.4187 20.237 23.0496L18.9944 21.4825Z"
            fill="#674433"
        />
    </svg>
);

const row_svg = (
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
            d="M7 8C7 7.44772 7.44772 7 8 7H24C24.5523 7 25 7.44772 25 8V10C25 10.5523 24.5523 11 24 11H8C7.44772 11 7 10.5523 7 10V8Z"
            fill="#674433"
        />
        <path
            d="M7 22C7 21.4477 7.44772 21 8 21H24C24.5523 21 25 21.4477 25 22V24C25 24.5523 24.5523 25 24 25H8C7.44772 25 7 24.5523 7 24V22Z"
            fill="#674433"
        />
        <path
            d="M7 15C7 14.4477 7.44772 14 8 14H24C24.5523 14 25 14.4477 25 15V17C25 17.5523 24.5523 18 24 18H8C7.44772 18 7 17.5523 7 17V15Z"
            fill="#674433"
        />
    </svg>
);

const grid_svg = (
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
            d="M7.0769 8.0769C7.0769 7.52462 7.52462 7.0769 8.0769 7.0769H10.0769C10.6292 7.0769 11.0769 7.52462 11.0769 8.0769V10.0769C11.0769 10.6292 10.6292 11.0769 10.0769 11.0769H8.0769C7.52462 11.0769 7.0769 10.6292 7.0769 10.0769V8.0769Z"
            fill="#674433"
        />
        <path
            d="M20.9231 8.0769C20.9231 7.52462 21.3708 7.0769 21.9231 7.0769H23.9231C24.4754 7.0769 24.9231 7.52462 24.9231 8.0769V10.0769C24.9231 10.6292 24.4754 11.0769 23.9231 11.0769H21.9231C21.3708 11.0769 20.9231 10.6292 20.9231 10.0769V8.0769Z"
            fill="#674433"
        />
        <path
            d="M14 8.0769C14 7.52462 14.4477 7.0769 15 7.0769H17C17.5523 7.0769 18 7.52462 18 8.0769V10.0769C18 10.6292 17.5523 11.0769 17 11.0769H15C14.4477 11.0769 14 10.6292 14 10.0769V8.0769Z"
            fill="#674433"
        />
        <path
            d="M7.0769 21.9231C7.0769 21.3708 7.52462 20.9231 8.0769 20.9231H10.0769C10.6292 20.9231 11.0769 21.3708 11.0769 21.9231V23.9231C11.0769 24.4754 10.6292 24.9231 10.0769 24.9231H8.0769C7.52462 24.9231 7.0769 24.4754 7.0769 23.9231V21.9231Z"
            fill="#674433"
        />
        <path
            d="M20.9231 21.9231C20.9231 21.3708 21.3708 20.9231 21.9231 20.9231H23.9231C24.4754 20.9231 24.9231 21.3708 24.9231 21.9231V23.9231C24.9231 24.4754 24.4754 24.9231 23.9231 24.9231H21.9231C21.3708 24.9231 20.9231 24.4754 20.9231 23.9231V21.9231Z"
            fill="#674433"
        />
        <path
            d="M14 21.9231C14 21.3708 14.4477 20.9231 15 20.9231H17C17.5523 20.9231 18 21.3708 18 21.9231V23.9231C18 24.4754 17.5523 24.9231 17 24.9231H15C14.4477 24.9231 14 24.4754 14 23.9231V21.9231Z"
            fill="#674433"
        />
        <path
            d="M7.0769 15C7.0769 14.4477 7.52462 14 8.0769 14H10.0769C10.6292 14 11.0769 14.4477 11.0769 15V17C11.0769 17.5523 10.6292 18 10.0769 18H8.0769C7.52462 18 7.0769 17.5523 7.0769 17V15Z"
            fill="#674433"
        />
        <path
            d="M20.9231 15C20.9231 14.4477 21.3708 14 21.9231 14H23.9231C24.4754 14 24.9231 14.4477 24.9231 15V17C24.9231 17.5523 24.4754 18 23.9231 18H21.9231C21.3708 18 20.9231 17.5523 20.9231 17V15Z"
            fill="#674433"
        />
        <path
            d="M14 15C14 14.4477 14.4477 14 15 14H17C17.5523 14 18 14.4477 18 15V17C18 17.5523 17.5523 18 17 18H15C14.4477 18 14 17.5523 14 17V15Z"
            fill="#674433"
        />
    </svg>
);
