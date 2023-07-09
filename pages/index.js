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
import SubjectCard from "@components/Search/SubjectCard";
import { useEffect } from "react";
import { useWindowSize } from "rooks";
import { useMotionValueEvent, useScroll, motion, useSpring } from "framer-motion";
import { useContext } from "react";
import { AppRefContext } from "./_app";

export default function Home() {
    // this will try to login with anonymous
    const { app, user } = useMongo();
    const appRef = useContext(AppRefContext);
    console.log(appRef)

    //This will either work or be disastrous
    //Get the position
    const { scrollYProgress } = useScroll({ container: appRef });
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("Page scroll: ", latest)
    })

    return (
        <>
            <motion.div
                className="fixed h-3 bg-red-600 bottom-0 right-0 left-0 origin-center z-1"
                style={{ scaleX }}
            />
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
