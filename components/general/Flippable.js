import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";

export function Flippable({
    front,
    back,
    hasWatermark = false,
    onFlip = () => {},
    onClick = () => {},
    className,
    active = true,
}) {
    const [frontSide, setSide] = useState(true);
    function flipSide() {
        setSide(!frontSide);
    }

    return (
        <div
            className={clsx("flippable", frontSide && "flipped", className)}
            onClick={() => {
                onClick();
                if (!active) return;
                onFlip();
                flipSide();
            }}
        >
            <motion.div
                className="face front"
                animate={{
                    rotateY: frontSide ? "0deg" : "180deg",
                }}
                transition={{
                    duration: 0.22,
                    ease: [0.2, 0, 0.33, 1],
                }}
            >
                {front}
                {hasWatermark && <div className="watermark">flippy</div>}
            </motion.div>
            <motion.div
                className="face back"
                animate={{
                    rotateY: frontSide ? "180deg" : "0deg",
                }}
                transition={{
                    duration: 0.22,
                    ease: [0.2, 0, 0.33, 1],
                }}
            >
                {back}
                {hasWatermark && <div className="watermark">.cards</div>}
            </motion.div>
        </div>
    );
}
