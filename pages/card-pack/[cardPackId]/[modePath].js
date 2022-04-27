import Head from "next/head";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import GameScreens from "../../../components/InteractiveStudyMode/GameScreens/GameScreens";
import { gameSettingsState } from "../../../components/InteractiveStudyMode/GameStateHelpers";
import MenuScreen from "../../../components/InteractiveStudyMode/MenuScreens/MenuScreens";
import PostGameScreens from "../../../components/InteractiveStudyMode/PostGameScreens/PostGameScreens";
import { useMongo } from "../../../components/Mongo/MongoUtils";
import Navbar from "../../../components/Navbar";

export const CardPackContext = createContext();

export default function CardPackMatchInteractiveStudyMode() {
    const router = useRouter();
    const gameSettings = useRecoilValue(gameSettingsState);
    const { cardPackId, modePath } = router.query;
    const { db, isAnon } = useMongo();
    const query = useQuery(
        ["card-pack-interactive-study-mode", cardPackId, isAnon, modePath],
        () =>
            db.collection("cardpacks").findOne(
                {
                    _id: cardPackId,
                },
                {
                    image: 1,
                    title: 1,
                    likes: 1,
                    shares: 1,
                    duplicates: 1,
                    views: 1,
                    tags: 1,
                }
            ),
        { refetchOnWindowFocus: false, enabled: router.isReady }
    );
    return (
        <>
            <Head>
                <title>Card Pack - Flippy - Flashcard App</title>
                <meta name="description" content="Flippy - Flashcard App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main id="interactive-study-mode">
                <CardPackContext.Provider value={query}>
                    {gameSettings.stage === "menu-screen" && <MenuScreen />}
                    {gameSettings.stage === "game-screen" && <GameScreens />}
                    {gameSettings.stage === "post-game-screen" && (
                        <PostGameScreens />
                    )}
                </CardPackContext.Provider>
            </main>
        </>
    );
}
