import clsx from "clsx";
import { motion, useMotionTemplate, useSpring } from "framer-motion";
import { useState } from "react";
import useSound from "use-sound";
import Image from "next/image";

export default function Hero() {
    return (
        <div
            className="hero mb-20 relative flex justify-center items-center gap-5 h-[480rem]"
            // style={{ height: "480rem" }}
        >
            <div style={{ width: "300rem" }}>
                <FlippyCard />
            </div>
            <div className="tagline" style={{ width: "300rem" }}>
                Make it.
                <br />
                Flip it.
                <br />
                Learn it.
            </div>
        </div>
    );
}

function FlippyCard({ active = true }) {
    const [play] = useSound("/cardflip.m4a");
    const [flip, setFlip] = useState(false);
    const scale = useSpring(1, { stiffness: 700, damping: 35 });
    const filter = useMotionTemplate`opacity(${scale})`;

    return (
        <motion.div
            onClick={() => {
                if (active) {
                    setFlip(!flip);
                    play();
                }
                // console.log(window);
                window?.umami?.("Click - Home - Hero - Card");
            }}
            className={clsx("card", active && "active")}
            initial={{
                scale: 0.3,
                opacity: 0,
            }}
            animate={{
                scale: 1,
                opacity: 1,
            }}
            transition={{
                duration: 0.18,
                delay: 0.4,
            }}
        >
            <motion.div
                className="inner"
                style={{
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
                >
                    <BlankCardFace />
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
                >
                    <BlankCardFace front={false} />
                </motion.div>
            </motion.div>
        </motion.div>
    );
}

const BlankCardFace = ({
    front = true,
    backgroundColor = "#E7CDB5",
    active = false,
}) => (
    <motion.div
        className="face blank"
        initial={{ opacity: 1 }}
        animate={{ opacity: active ? 0 : 1 }}
    >
        <div className="cat-holder">
            {front ? (
                <Image
                    src="/assets/cardplaceholder/cat_face.png"
                    alt="card front face"
                    layout="responsive"
                    width="162w"
                    height="228w"
                />
            ) : (
                <Image
                    src="/assets/cardplaceholder/cat_butt.png"
                    alt="card back face"
                    layout="responsive"
                    width="141.5w"
                    height="227.8w"
                />
            )}
        </div>
        <div className="branding">
            {front ? (
                <Image
                    src="/assets/cardplaceholder/flippy.png"
                    alt="card branding front face"
                    layout="responsive"
                    width="68w"
                    height="29w"
                    objectFit="contain"
                />
            ) : (
                <Image
                    src="/assets/cardplaceholder/cards.png"
                    alt="card branding back face"
                    layout="responsive"
                    width="75w"
                    height="29w"
                    objectFit="contain"
                />
            )}
        </div>
    </motion.div>
);
