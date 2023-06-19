import clsx from "clsx";
import draftjsToHtml from "draftjs-to-html";
import { motion, useAnimation, useIsomorphicLayoutEffect } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import PlaceholderColumn from "../../../PlaceholderColumn";
import { cardFaceFamily, cardFacesSelector, gameStateFamily } from "./utils";

export default function Board() {
    const { cardFaces } = useRecoilValue(cardFacesSelector);
    const [playing, setPlaying] = useRecoilState(gameStateFamily("playing"));
    const currentRound = useRecoilValue(gameStateFamily("currentRound"));
    // uses list of cards from data
    // shuffles and chooses 6 max
    // then puts the term and definition into an array and shuffles again

    // action text logic
    // if new round/ show "start game"
    // else // which is is when the pause and resume
    // show "resume game"
    const [hasStarted, setStarted] = useState(false);
    useIsomorphicLayoutEffect(() => {
        setStarted(false);
    }, [currentRound]);

    return (
        <div className={clsx("board", !playing && "paused")}>
            {playing ? (
                cardFaces.map((cardFaceData, index) => (
                    <CardFace
                        {...cardFaceData}
                        key={cardFaceData.type + cardFaceData.cardId}
                        index={index}
                    />
                ))
            ) : (
                <PlaceholderColumn
                    options={{
                        sizeKey: "regular",
                        imageKey: "studyCat",
                        presetKey: undefined,
                        message: {
                            title: `Round ${currentRound}`,
                            description:
                                "Try to clear all the cards as fast as possible!",
                        },
                        action: {
                            label: hasStarted ? "Resume Game" : "Start Game",
                            props: {
                                onClick: () => {
                                    setPlaying(true);
                                    // playingRef.current = true;
                                    setStarted(true);
                                },
                            },
                        },
                    }}
                />
            )}
        </div>
    );
}

const cardFaceVariants = {
    hidden: {
        scale: 0.8,
        opacity: 0,
    },
    default: {
        scale: 1,
        opacity: 1,
        borderColor: "rgba(103,68,51,0)",
    },
    selected: {
        scale: 0.8,
        opacity: 1,
        borderColor: "rgba(103,68,51,1)",
    },
    wrong: {
        scale: 0.9,
        opacity: 1,
        borderColor: "rgba(235,87,87,1)",
    },
    correct: {
        scale: 0.9,
        opacity: 1,
        borderColor: "rgba(33,159,83,1)",
    },
    cleared: {
        scale: 0,
        opacity: 0,
        borderColor: "rgba(33,159,83,1)",
    },
};
const floaterVariants = {
    hidden: {
        scale: 0.5,
        opacity: 0,
    },
    default: {
        scale: 0.5,
        opacity: 0,
    },
    selected: {
        scale: 0.5,
        opacity: 0,
    },
    wrong: {
        scale: 2,
        opacity: 1,
    },
    correct: {
        scale: 2,
        opacity: 1,
    },
    cleared: {
        scale: 0.5,
        opacity: 0,
    },
};

/**
 * 
props example
​​
cardId: "c91cb5f3187c0862"
content: Object { blocks: (1) […], entityMap: {} }
id: "9e51da231f1528a9"
image: null
type: "definition"
 */

function CardFace({ faceId }) {
    const controls = useAnimation();
    const [cardState, setCardState] = useRecoilState(cardFaceFamily(faceId));
    const { image, content, gameState } = cardState;
    const imgSrc = image?.value?.cdnUrl;
    const [playing, setPlaying] = useRecoilState(gameStateFamily("playing"));

    // animation effects
    useIsomorphicLayoutEffect(() => {
        if (playing) {
            switch (gameState) {
                case "hidden": {
                    setCardState({
                        ...cardState,
                        gameState: "default",
                    });
                    break;
                }
                case "correct": {
                    controls.start(gameState).then(() => {
                        setCardState({
                            ...cardState,
                            gameState: "cleared",
                        });
                    });
                    break;
                }
                case "wrong": {
                    controls.start(gameState).then(() => {
                        setCardState({
                            ...cardState,
                            gameState: "default",
                        });
                    });
                    break;
                }
                default: {
                    controls.start(gameState);
                }
            }
        } else {
            controls.start("hidden");
        }
    }, [playing, gameState]);

    const inactive = ["cleared", "correct", "hidden"].includes(gameState);
    const handleClick = () => {
        if (inactive) return;
        if (gameState === "selected") {
            setCardState({
                ...cardState,
                gameState: "default",
            });
        } else {
            setCardState({
                ...cardState,
                gameState: "selected",
            });
        }
    };

    return (
        <div className="card">
            <div className={clsx("inner", gameState)}>
                <motion.div
                    tabIndex={inactive ? false : "0"}
                    whileHover={{
                        scale: 1.08,
                    }}
                    whileFocus={{
                        scale: 1.08,
                    }}
                    onKeyPress={(e) => {
                        if (e.code === "Space") {
                            handleClick();
                        }
                    }}
                    onClick={handleClick}
                >
                    <motion.div
                        className="face"
                        animate={controls}
                        initial="hidden"
                        variants={cardFaceVariants}
                    >
                        {imgSrc && (
                            <div className="img-wrapper">
                                <Image
                                    src={imgSrc}
                                    alt="card"
                                    className="object-contain"
                                />
                            </div>
                        )}
                        <div
                            className="content"
                            dangerouslySetInnerHTML={{
                                __html: draftjsToHtml(content),
                            }}
                        />
                        <motion.div
                            className="floater"
                            animate={controls}
                            initial={false}
                            variants={floaterVariants}
                        >
                            {gameState === "wrong" && wrongSvg}
                            {gameState === "correct" && correctSvg}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

const wrongSvg = (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="32" height="32" rx="16" fill="#F9BFBF" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.2929 9.29289C21.6834 8.90237 22.3166 8.90237 22.7071 9.29289C23.0976 9.68342 23.0976 10.3166 22.7071 10.7071L17.4142 16L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L16 17.4142L10.7071 22.7071C10.3166 23.0976 9.68342 23.0976 9.29289 22.7071C8.90237 22.3166 8.90237 21.6834 9.29289 21.2929L14.5858 16L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289C9.68342 8.90237 10.3166 8.90237 10.7071 9.29289L16 14.5858L21.2929 9.29289Z"
            fill="#EB5757"
        />
    </svg>
);
const correctSvg = (
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="32" height="32" rx="16" fill="#B7FAD3" />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24.5782 9.19642C25.0369 9.52861 25.137 10.1664 24.8018 10.621L15.3994 22.3731C14.8261 23.1506 13.6791 23.2157 13.02 22.508L7.27278 16.3372C6.88747 15.9235 6.9135 15.2785 7.33092 14.8967C7.74833 14.5148 8.39906 14.5406 8.78437 14.9543L14.1074 20.6697L23.1409 9.41802C23.4761 8.96345 24.1196 8.86423 24.5782 9.19642Z"
            fill="#219653"
        />
    </svg>
);
