import "core-js/actual/array/at"; // <- at the top of your entry point
import Head from "next/head";
import useSound from "use-sound";
import { CreateYourOwnPacks } from "../components/Home/CreateYourOwnPacks";
import Hero from "../components/Home/Hero";
import InteractiveStudyModes from "../components/Home/InteractiveStudyModes";
import { useMongo } from "../components/Mongo/MongoUtils";
import Navbar from "../components/navbar/Navbar";
import { cardpackSchema } from "../schemas/cardpacks/publishedCardpack";
import HomePage from "@components/Home/HomePage";
import Footer from "@components/Home/Footer";

export default function Home() {
    // this will try to login with anonymous
    const { app, user } = useMongo();
    const [play] = useSound("/cardflip.m4a");
    return (
        <>
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
