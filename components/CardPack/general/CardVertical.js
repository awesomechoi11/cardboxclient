import ImageViewer from "@components/Modals/ImageViewer/ImageViewer";
import { normalizeImageSrc } from "@components/general/NormalizedImage";
import draftjsToHtml from "draftjs-to-html";
import { motion } from "framer-motion";
import { BlankCardFace } from "./BlankCardFace";

export default function CardVertical({ cardState, active, play }) {
    const { cardSide, cardData, flipCard } = cardState;
    let frontData = cardData?.term;
    let backData = cardData?.definition;
    const flip = cardSide;
    return (
        <div
            onClick={() => {
                if (active) {
                    flipCard();
                    play();
                }
            }}
        >
            <motion.div className="w-[260px] h-[353px] box-border break-words select-none relative text-center opacity-100">
                <motion.div
                    className="absolute w-full h-full preserve-3d backface-hidden transform-gpu"
                    initial={flip ? "0deg" : "180deg"}
                    animate={{
                        rotateY: flip ? "180deg" : "0deg",
                    }}
                    transition={{
                        duration: 0.24,
                    }}
                >
                    {/* <AnimatePresence> */}
                    {active && frontData && <CardFace data={frontData} />}
                    {/* </AnimatePresence> */}
                    <BlankCardFace active={active} />
                </motion.div>
                <motion.div
                    className="absolute w-full h-full preserve-3d backface-hidden transform-gpu"
                    initial={flip ? "0deg" : "180deg"}
                    animate={{
                        rotateY: flip ? "0deg" : "180deg",
                    }}
                    transition={{
                        duration: 0.24,
                    }}
                >
                    {active && backData && <CardFace data={backData} />}
                    <BlankCardFace active={active} />
                </motion.div>
            </motion.div>
        </div>
    );
}

function CardFace({ data: { image, content } }) {
    let imgSrc = normalizeImageSrc(image);
    return (
        <motion.div className="box-border absolute flex flex-col items-center justify-center w-full h-full gap-3 p-3 bg-blue-100 shadow-2xl pointer-events-none desktop:rounded-2xl rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* {imgSrc && <img layout="fill" src={imgSrc} alt="card" />} */}
            {imgSrc && (
                <ImageViewer className="pointer-events-auto" imgData={image} />
            )}
            <div
                className="break-words"
                dangerouslySetInnerHTML={{ __html: draftjsToHtml(content) }}
            />{" "}
        </motion.div>
    );
}
