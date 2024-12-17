import clsx from "clsx";
import { motion, useMotionTemplate, useSpring } from "motion/react";
import { useState } from "react";
import useSound from "use-sound";
import Image from "next/image";
import { useWindowSize } from "rooks";
import { Flippable } from "@components/general/Flippable";

export default function Hero() {
    const [play] = useSound("/cardflip.m4a");
    return (
        <div className="">
            <div className="relative z-10 px-1 mx-auto border border-red-600 max-w-screen-2xl">
                <div className="absolute bottom-[-100px] right-[200px] rotate-12">
                    <Flippable
                        hasWatermark
                        front={
                            <>
                                One of the ancient world wonders, the “Hanging
                                Gardens,” was found in which city?
                            </>
                        }
                        back={
                            <>
                                <Image
                                    src="https://ucarecdn.com/e9c1edee-0693-43b2-b173-e0cfd95f8063/-/scale_crop/400x400/smart"
                                    alt="babylon"
                                    width="200"
                                    height="200"
                                />
                                <div className="mx-2 my-0 font-bold text-blue-600">
                                    Babylon
                                </div>
                            </>
                        }
                        onFlip={play}
                        className="card2"
                    />
                </div>
                <div className="font-gilroy font-bold leading-none text-[285px]">
                    <div className="text-black">Study with</div>
                    <div className="text-blue-600">Flippy!</div>
                </div>

                <div className="flex flex-row max-w-xl gap-3 mt-5">
                    <div className="w-1 my-[4px] bg-blue-600"></div>
                    <div className="w-full">
                        Effortlessly{" "}
                        <span className="font-bold">
                            create, organize, and review flashcards
                        </span>{" "}
                        to ace any subject. Unlock smarter studying with spaced
                        repetition, progress tracking, and gamified learning –
                        all in one powerful tool!
                    </div>
                </div>
            </div>
            {/* wave container */}
            <div className="absolute inset-0 top-[750px] flex items-center justify-center">
                <WavePattern />
            </div>
        </div>
    );
}
function WavePattern() {
    const { outerWidth } = useWindowSize();
    let winWidth = outerWidth;
    const waveletWidth = 182;
    if (typeof window === "undefined") winWidth = 1920;
    return (
        <motion.svg
            className="absolute"
            width={winWidth + waveletWidth * 2}
            height={590}
            initial={{
                x: 0,
            }}
            animate={{
                x: waveletWidth,
            }}
            transition={{
                duration: 3,
                ease: "linear",
                repeat: Infinity,
            }}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Define the pattern */}
            <defs>
                <pattern
                    id="wavePattern"
                    patternUnits="userSpaceOnUse"
                    width="182" /* Width of one wavelet */
                    height="590" /* Height of one wavelet */
                >
                    {/* Single Wavelet */}
                    <path
                        d="M0 0C33.4164 44.1421 74.4114 47.8494 91.2131 47.8494C107.836 47.8494 148.584 44.1421 182 0V590H0L0 0Z"
                        fill="url(#gradient)"
                    />
                </pattern>

                {/* Linear Gradient */}
                <linearGradient
                    id="gradient"
                    x1="91"
                    y1="0"
                    x2="91"
                    y2="590"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#99CAEE" />
                    <stop offset="1" stopColor="#98D4FF" stopOpacity="0" />
                </linearGradient>
            </defs>

            {/* Use the pattern to fill the entire SVG */}
            <rect width="100%" height="100%" fill="url(#wavePattern)" />
        </motion.svg>
    );
}
