import { MotionConfig } from "framer-motion";
import Head from "next/head";
import { createContext, useState } from "react";
import CardPackBrowser from "../components/Browse/CardPackBrowser";
import CardPackPreview from "../components/Browse/CardPackPreview";
import Navbar from "../components/Navbar";

export const BrowseContext = createContext();

export default function Browse() {
    const [selected, setSelected] = useState(null);

    return (
        <>
            <Head>
                <title>Browse - Flippy - Flashcard App</title>
                <meta name="description" content="Flippy - Flashcard App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main id="Browse" className="wide">
                <BrowseContext.Provider
                    value={{
                        selectedState: [selected, setSelected],
                    }}
                >
                    <MotionConfig
                        transition={{
                            duration: 0.22,
                            ease: [0.2, 0, 0.33, 1],
                        }}
                    >
                        <CardPackBrowser />
                        <CardPackPreview />
                    </MotionConfig>
                </BrowseContext.Provider>
            </main>
        </>
    );
}
