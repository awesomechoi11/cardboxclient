import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function SubjectCard({
    backgroundImg = {
        src: "https://cdn.discordapp.com/attachments/1082157939906855083/1120225889892966470/image.png",
        alt: "Hot air balloon flying over a river and mountains",
    },
    title = "Geography",
    titleColor = "#FAFDFD",
    topGradient = "linear-gradient(180deg, #E6596B 0%, rgba(230, 89, 107, 0) 100%)",

    subtitle = "62 topics",
    subtitleColor = "#FAFDFD",
    bottomGradient = "linear-gradient(180deg, rgba(14, 46, 66, 0) 0%, #0E2E42 100%)",

    to = "/subject/geography",
}) {
    return (
        <Link href={to}>
            <motion.div
                whileHover={{
                    scale: 1.015,
                }}
                className="w-[354px] h-[422px] rounded-xl relative overflow-hidden"
            >
                {/* background image */}
                <Image
                    {...backgroundImg}
                    fill
                    className="absolute object-cover w-full h-full"
                />
                {/* top gradient */}
                <div
                    className="absolute left-0 right-0 h-[90px] top-0 "
                    style={{
                        background: topGradient,
                    }}
                />
                <div
                    className="absolute top-[16px] w-full px-3 font-bold text-lg"
                    style={{
                        color: titleColor,
                    }}
                >
                    {title}
                </div>
                {/* bottom gradient */}
                <div
                    className="absolute left-0 right-0 h-[190px] bottom-0"
                    style={{
                        background: bottomGradient,
                    }}
                />
                <div
                    className="absolute bottom-[20px] w-full px-3 font-bold text-base"
                    style={{
                        color: subtitleColor,
                    }}
                >
                    {subtitle}
                </div>
            </motion.div>
        </Link>
    );
}
