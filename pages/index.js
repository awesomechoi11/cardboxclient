import "core-js/actual/array/at"; // <- at the top of your entry point
import Head from "next/head";
import useSound from "use-sound";
import { CreateYourOwnPacks } from "../components/Home/CreateYourOwnPacks";
import Hero from "../components/Home/Hero";
import InteractiveStudyModes from "../components/Home/InteractiveStudyModes";
import { useMongo } from "../components/Mongo/MongoUtils";
import Navbar from "../components/Navbar";
import { cardpackSchema } from "../schemas/cardpacks/publishedCardpack";
import HomePage from "@components/Home/HomePage";
import Footer from "@components/Home/Footer";
import { useMotionValueEvent, useSpring, motion, useScroll, Variants } from 'framer-motion';
import { useContext } from "react";
import { AppRefContext } from "./_app";

export default function Home() {
    // this will try to login with anonymous
    const { app, user } = useMongo();
    const appRef = useContext(AppRefContext)

    const { scrollYProgress } = useScroll({
        container: appRef,
        offset: ["end end", "start start"]
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("Page scroll: ", latest)
    })


    return (
        <>
            {/* <motion.div
                className="progress-bar bg-blue-400 fixed h-4 bottom-0 left-0 right-0"
                style={{ scaleX: scrollYProgress }}
                initial={{ opacity: 0, scale: 0.5}}
                whileInView={{ opacity: 1, scale: 1}}
            /> */}
            <Head>
                <title key="title">Flippy - Home - Flashcard App</title>
            </Head>
            <Navbar />
            <main id="home" className="p-0">
                {/* <Hero /> */}
                <HomePage />
                {/* <CreateYourOwnPacks play={play} />
                <InteractiveStudyModes play={play} /> */}
            </main>
            <Footer />
        </>
    );
}
