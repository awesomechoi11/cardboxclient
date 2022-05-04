import clsx from "clsx";
import draftjsToHtml from "draftjs-to-html";
import {
    motion,
    useIsomorphicLayoutEffect,
    useMotionTemplate,
    useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";
import { relativeRem } from "../../utils";
import { DragDropRef } from "./CardSwiper";
import { useCardSwiperControls } from "./_CardSwiperUtils";

export default function Card({
    active = false,
    backgroundColor = "#E7CDB5",
    arrIndex,
    play,
}) {
    const { increment, decrement, currentCard, cardDefaultSide } =
        useCardSwiperControls();

    const [cardData, setCardData] = useState({});
    let frontData = cardData?.term;
    let backData = cardData?.definition;

    const [flip, setFlip] = useState(cardDefaultSide);
    // on drop, clicking will cancel its dragSnapToOrigin animation
    // lock prevents drag event
    const [locked, setLock] = useState(false);
    const [dragging, setDragging] = useState(false);

    const dragThreshold = relativeRem(270);
    const dragRotateScale = 1;

    // inner card animations
    const randomRotateSpread = 17;
    const rotate = useSpring(randomRotateSpread * (Math.random() - 0.5), {
        stiffness: 700,
        damping: 35,
    });
    const scale = useSpring(1, { stiffness: 700, damping: 35 });
    const filter = useMotionTemplate`opacity(${scale})`;

    useIsomorphicLayoutEffect(() => {
        if (active) {
            rotate.set(0);
            setCardData(currentCard);
        }
    }, [active]);
    useEffect(() => {
        if (!active) {
            setFlip(cardDefaultSide);
        }
    }, [cardDefaultSide]);

    return (
        <motion.div
            drag={active && !locked}
            dragConstraints={DragDropRef}
            dragElastic={0.35}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
            whileDrag={{
                scale: 0.95,
            }}
            style={{
                zIndex: arrIndex,
            }}
            onDragStart={() => {
                setDragging(true);
            }}
            onDrag={(e, info) => {
                rotate.set((info.offset.x / 20) * dragRotateScale, 0.1);

                if (Math.abs(info.offset.x) > dragThreshold) {
                    scale.set(0.8);
                } else {
                    scale.set(1);
                }
            }}
            onDragEnd={(e, info) => {
                rotate.set(0);
                scale.set(1);
                setLock(true);
                window.umami("Drag End - CardSwiper - Card");
                if (Math.abs(info.offset.x) > dragThreshold) {
                    if (Math.sign(info.offset.x) > 0) {
                        // right
                        increment();
                    } else {
                        //left
                        decrement();
                    }
                }

                setTimeout(() => {
                    setDragging(false);
                    setLock(false);
                }, 180);
            }}
            onClick={() => {
                if (active && !dragging) {
                    setFlip(!flip);
                    play();
                    window.umami("Click - CardSwiper - Card");
                }
            }}
            className={clsx("card", active && "active")}
            initial={{
                scale: 0.3,
            }}
            animate={{
                scale: 1,
            }}
            exit={{
                scale: 0.3,
            }}
            transition={{
                duration: 0.18,
            }}
        >
            <motion.div
                className="inner"
                style={{
                    rotateZ: rotate,
                    scale,
                    filter,
                }}
            >
                <motion.div
                    className="front-face"
                    initial={flip ? "0deg" : "180deg"}
                    animate={{
                        rotateY: flip ? "180deg" : "0deg",
                    }}
                    transition={{
                        duration: 0.24,
                    }}
                    style={{
                        backgroundColor,
                    }}
                >
                    {/* <AnimatePresence> */}
                    {active && frontData && (
                        <CardFace
                            backgroundColor={backgroundColor}
                            data={frontData}
                        />
                    )}
                    {/* </AnimatePresence> */}
                    <BlankCardFace
                        backgroundColor={backgroundColor}
                        active={active}
                    />
                </motion.div>
                <motion.div
                    className="back-face"
                    initial={flip ? "0deg" : "180deg"}
                    animate={{
                        rotateY: flip ? "0deg" : "180deg",
                    }}
                    transition={{
                        duration: 0.24,
                    }}
                    style={{
                        backgroundColor,
                    }}
                >
                    {active && backData && (
                        <CardFace
                            backgroundColor={backgroundColor}
                            data={backData}
                        />
                    )}
                    <BlankCardFace
                        backgroundColor={backgroundColor}
                        active={active}
                    />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

function CardFace({ data: { image, content }, backgroundColor }) {
    const imgSrc = image?.value?.cdnUrl;

    return (
        <motion.div
            className="face"
            style={{
                backgroundColor,
            }}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {imgSrc && <img layout="fill" src={imgSrc} alt="card" />}
            <div dangerouslySetInnerHTML={{ __html: draftjsToHtml(content) }} />
        </motion.div>
    );
}

const BlankCardFace = ({ backgroundColor = "#E7CDB5", active }) => (
    <motion.div
        className="face blank"
        initial={{ opacity: 1 }}
        animate={{ opacity: active ? 0 : 1 }}
    >
        <svg
            viewBox="0 0 180 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                width="180"
                height="240"
                rx="16"
                // fill={backgroundColor}
            />
            <path
                d="M56.6165 86.0187H48.5838C48.4767 85.1941 48.2572 84.4497 47.9251 83.7857C47.5931 83.1216 47.154 82.554 46.6078 82.0827C46.0616 81.6115 45.4136 81.2527 44.6639 81.0064C43.9249 80.7493 43.1056 80.6208 42.2059 80.6208C40.6101 80.6208 39.2338 81.0117 38.0771 81.7936C36.9311 82.5754 36.0475 83.7053 35.4264 85.1833C34.8159 86.6614 34.5106 88.45 34.5106 90.5492C34.5106 92.734 34.8212 94.5655 35.4424 96.0435C36.0743 97.5108 36.9579 98.6193 38.0932 99.369C39.2392 100.108 40.594 100.477 42.1577 100.477C43.0359 100.477 43.8339 100.365 44.5514 100.14C45.2797 99.9152 45.917 99.5886 46.4632 99.1601C47.0201 98.721 47.4753 98.1909 47.8288 97.5697C48.1929 96.9378 48.4446 96.2256 48.5838 95.433L56.6165 95.4812C56.4772 96.9378 56.0542 98.3729 55.3473 99.7867C54.6511 101.2 53.6926 102.491 52.4716 103.658C51.2507 104.815 49.7619 105.736 48.0055 106.422C46.2597 107.107 44.2569 107.45 41.9971 107.45C39.0196 107.45 36.3528 106.797 33.9965 105.49C31.651 104.173 29.7982 102.255 28.438 99.7385C27.0778 97.2216 26.3977 94.1585 26.3977 90.5492C26.3977 86.9291 27.0885 83.8606 28.4701 81.3437C29.8517 78.8269 31.7206 76.9151 34.0769 75.6084C36.4331 74.3018 39.0732 73.6485 41.9971 73.6485C43.9892 73.6485 45.8313 73.9269 47.5235 74.4839C49.2157 75.0301 50.7044 75.8334 51.9897 76.8937C53.2749 77.9433 54.3191 79.2338 55.1224 80.7654C55.9257 82.297 56.4237 84.0481 56.6165 86.0187ZM67.4445 107H58.8977L69.9988 74.0983H80.5859L91.687 107H83.1402L75.4128 82.388H75.1558L67.4445 107ZM66.3038 94.0514H84.1684V100.092H66.3038V94.0514ZM95.2294 107V74.0983H108.821C111.284 74.0983 113.41 74.5428 115.199 75.4317C116.998 76.31 118.385 77.5738 119.359 79.2231C120.334 80.8618 120.821 82.8057 120.821 85.0548C120.821 87.3361 120.323 89.2746 119.327 90.8705C118.331 92.4556 116.917 93.6658 115.086 94.5012C113.255 95.3259 111.086 95.7382 108.58 95.7382H99.9847V89.4728H107.102C108.301 89.4728 109.303 89.3175 110.106 89.0069C110.92 88.6856 111.536 88.2036 111.953 87.561C112.371 86.9077 112.58 86.0723 112.58 85.0548C112.58 84.0374 112.371 83.1966 111.953 82.5326C111.536 81.8578 110.92 81.3545 110.106 81.0224C109.292 80.6797 108.29 80.5084 107.102 80.5084H103.182V107H95.2294ZM113.753 91.9629L121.946 107H113.271L105.238 91.9629H113.753ZM137.344 107H125.183V74.0983H137.328C140.681 74.0983 143.567 74.757 145.988 76.0743C148.419 77.381 150.293 79.266 151.61 81.7293C152.928 84.1819 153.586 87.1165 153.586 90.5331C153.586 93.9603 152.928 96.9056 151.61 99.369C150.304 101.832 148.435 103.723 146.004 105.04C143.572 106.347 140.686 107 137.344 107ZM133.135 100.22H137.039C138.881 100.22 140.44 99.9099 141.714 99.2887C142.999 98.6568 143.969 97.6339 144.622 96.2202C145.286 94.7957 145.618 92.9 145.618 90.5331C145.618 88.1661 145.286 86.2811 144.622 84.8781C143.958 83.4644 142.978 82.4469 141.682 81.8257C140.397 81.1938 138.812 80.8779 136.927 80.8779H133.135V100.22Z"
                fill="#674433"
                fillOpacity="0.1"
            />
            <path
                d="M26.8358 161.341V117.342H45.9133C49.2647 117.342 52.0791 117.793 54.3563 118.696C56.6479 119.598 58.3738 120.873 59.5339 122.52C60.7083 124.167 61.2955 126.107 61.2955 128.342C61.2955 129.96 60.9375 131.435 60.2214 132.767C59.5196 134.099 58.5313 135.217 57.2566 136.119C55.9819 137.007 54.4924 137.623 52.788 137.966V138.396C54.6786 138.468 56.3973 138.948 57.9441 139.835C59.4909 140.709 60.7226 141.919 61.6393 143.466C62.5559 144.999 63.0142 146.803 63.0142 148.88C63.0142 151.286 62.384 153.427 61.1237 155.304C59.8776 157.18 58.1016 158.655 55.7957 159.729C53.4898 160.803 50.7399 161.341 47.546 161.341H26.8358ZM38.7807 151.802H44.3665C46.3716 151.802 47.8754 151.429 48.878 150.685C49.8806 149.926 50.3819 148.808 50.3819 147.333C50.3819 146.302 50.1455 145.428 49.6729 144.712C49.2003 143.996 48.5271 143.452 47.6534 143.08C46.7941 142.707 45.7557 142.521 44.5383 142.521H38.7807V151.802ZM38.7807 135.131H43.679C44.7245 135.131 45.6483 134.966 46.4504 134.636C47.2524 134.307 47.8754 133.834 48.3194 133.219C48.7778 132.588 49.0069 131.822 49.0069 130.92C49.0069 129.559 48.5199 128.521 47.546 127.805C46.5721 127.074 45.3404 126.709 43.8508 126.709H38.7807V135.131ZM109.87 139.341C109.87 144.24 108.918 148.372 107.013 151.737C105.108 155.089 102.537 157.631 99.3 159.364C96.0632 161.083 92.4539 161.942 88.4723 161.942C84.462 161.942 80.8384 161.076 77.6016 159.343C74.379 157.595 71.8153 155.046 69.9105 151.694C68.0199 148.329 67.0746 144.211 67.0746 139.341C67.0746 134.443 68.0199 130.318 69.9105 126.967C71.8153 123.601 74.379 121.059 77.6016 119.34C80.8384 117.607 84.462 116.741 88.4723 116.741C92.4539 116.741 96.0632 117.607 99.3 119.34C102.537 121.059 105.108 123.601 107.013 126.967C108.918 130.318 109.87 134.443 109.87 139.341ZM97.5813 139.341C97.5813 136.706 97.2304 134.486 96.5286 132.681C95.8412 130.863 94.8171 129.488 93.4565 128.557C92.1102 127.611 90.4488 127.139 88.4723 127.139C86.4958 127.139 84.8272 127.611 83.4666 128.557C82.1203 129.488 81.0962 130.863 80.3945 132.681C79.707 134.486 79.3632 136.706 79.3632 139.341C79.3632 141.977 79.707 144.204 80.3945 146.023C81.0962 147.827 82.1203 149.202 83.4666 150.148C84.8272 151.079 86.4958 151.544 88.4723 151.544C90.4488 151.544 92.1102 151.079 93.4565 150.148C94.8171 149.202 95.8412 147.827 96.5286 146.023C97.2304 144.204 97.5813 141.977 97.5813 139.341ZM125.247 117.342L132.465 130.146H132.809L140.113 117.342H153.433L140.285 139.341L153.949 161.341H140.285L132.809 148.279H132.465L124.989 161.341H111.411L124.903 139.341L111.841 117.342H125.247Z"
                fill="#674433"
                fillOpacity="0.3"
            />
        </svg>
    </motion.div>
);
