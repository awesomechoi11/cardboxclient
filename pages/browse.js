import { MotionConfig } from "framer-motion";
import Head from "next/head";
import { createContext, useState } from "react";
import CardPackBrowser from "../components/Browse/CardPackBrowser";
import CardPackPreview from "../components/Browse/CardPackPreview";
import Navbar from "../components/Navbar";
import { useIsMobile } from "@components/mediaQueryHooks";
import { WaitForMongo } from "@components/Mongo/MongoUtils";

export const BrowseContext = createContext();

export default function Browse() {
    const [selected, setSelected] = useState(null);
    const isMobile = useIsMobile();

    return (
        <>
            <Head>
                <title key="title">Browse - Flippy - Flashcard App</title>
            </Head>
            <Navbar />
            <main id="Browse" className="px-20 pt-0">
                <WaitForMongo>
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
                            {!isMobile && <CardPackPreview />}
                        </MotionConfig>
                    </BrowseContext.Provider>
                </WaitForMongo>
            </main>
        </>
    );
}
