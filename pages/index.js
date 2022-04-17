import Head from "next/head";
import Navbar from "../components/Navbar";
import "core-js/actual/array/at"; // <- at the top of your entry point
import { useMongo } from "../components/Mongo/MongoUtils";
import Hero from "../components/Home/Hero";
import { cardpackSchema } from "../schemas/cardpacks/publishedCardpack";
import PlaceholderColumn from "../components/PlaceholderColumn";

export default function Home() {
    // this will try to login with anonymous
    const { app, user } = useMongo();
    console.log(app, user, cardpackSchema);

    return (
        <>
            <Head>
                <title>CardBox - Flashcard App</title>
                <meta name="description" content="CardBox - Flashcard App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main id="home">
                <Hero />
                {/* <div className="divider" />
                community packs */}
            </main>
        </>
    );
}
