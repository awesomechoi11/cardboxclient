import Head from "next/head";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useQuery } from "react-query";
import { RecoilRoot, useRecoilValue } from "recoil";
import GameScreens from "../../../components/InteractiveStudyMode/GameScreens/GameScreens";
import { gameSettingsState } from "../../../components/InteractiveStudyMode/GameStateHelpers";
import MenuScreen from "../../../components/InteractiveStudyMode/MenuScreens/MenuScreens";
import PostGameScreens from "../../../components/InteractiveStudyMode/PostGameScreens/PostGameScreens";
import { useMongo, WaitForMongo } from "../../../components/Mongo/MongoUtils";
import Navbar from "../../../components/Navbar";
import PlaceholderColumn from "../../../components/PlaceholderColumn";

export const CardPackContext = createContext();

export default function CardPackMatchInteractiveStudyMode() {
  return (
    <>
      <Head>
        <title key="title">Card Pack - Flippy - Flashcard App</title>
      </Head>
      <Navbar />
      <WaitForMongo>
        <Main />
      </WaitForMongo>
    </>
  );
}

function Main() {
  const router = useRouter();
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
    <main id="interactive-study-mode">
      {query.isSuccess &&
        (query.data ? (
          <CardPackContext.Provider value={query}>
            <RecoilRoot>
              <Inner />
            </RecoilRoot>
          </CardPackContext.Provider>
        ) : (
          <div className="placeholder-wrapper flex justify-center">
            <PlaceholderColumn
              options={{
                imageKey: "oopsCat",
                message: {
                  title: "Something went wrong...",
                  description: "The link seems to be broken",
                },
              }}
            />
          </div>
        ))}
      {query.isIdle && (
        <div className="placeholder-wrapper flex justify-center">
          <PlaceholderColumn presetKey="loading" />
        </div>
      )}
      {query.isLoading && (
        <div className="placeholder-wrapper flex justify-center">
          <PlaceholderColumn presetKey="loading" />
        </div>
      )}
      {query.isError && (
        <div className="placeholder-wrapper flex justify-center">
          <PlaceholderColumn presetKey="error" />
        </div>
      )}
    </main>
  );
}

function Inner() {
  const gameSettings = useRecoilValue(gameSettingsState);

  return (
    <>
      {gameSettings.stage === "menu-screen" && <MenuScreen />}
      {gameSettings.stage === "game-screen" && <GameScreens />}
      {gameSettings.stage === "post-game-screen" && <PostGameScreens />}
    </>
  );
}
