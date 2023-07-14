import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { cardpackDraftsDefault } from "../../components/Mongo/documents/cardpacks";
import { useMongo, WaitForMongo } from "../../components/Mongo/MongoUtils";
import Navbar from "../../components/navbar/Navbar";
import PlaceholderColumn from "../../components/PlaceholderColumn";
import { alphaNumId } from "../../components/utils";

export default function CreatePack() {
    return (
        <>
            <Head>
                <title key="title">
                    Card Pack Editor - Flippy - Flashcard App
                </title>
            </Head>
            <Navbar />
            <WaitForMongo>
                <Main />
            </WaitForMongo>
        </>
    );
}

function Main() {
    const { isReady, push } = useRouter();
    // check if user can create a pack

    // if so
    // create pack and redirect

    // else

    // show cannot sign and prolly a button to go home
    const { user, db, isAnon } = useMongo();
    const { data, isSuccess, isError, isIdle, isLoading } = useQuery(
        ["editor-new", isAnon],
        () =>
            user
                .refreshCustomData()
                .then(() => {
                    if (isAnon) {
                        toast.error(
                            "You are not allowed to make cards! Please create an account."
                        );
                        throw Error(
                            "You are not allowed to make cards! Please create an account."
                        );
                    }
                })
                .then(() => {
                    // check if user can create a pack
                    const maxCards = 100;
                    if (user.customData.cardPacks.length > maxCards) {
                        toast.error(
                            `Max Number of Drafts Reached : ${maxCards}`
                        );
                        throw Error(
                            `"User Max Number of CardPackDrafts Reached : ${maxCards}`
                        );
                    }
                })
                .then(async () => {
                    // create pack : add to cardpacks collection
                    const cardpackId = alphaNumId(8);

                    await db.collection("cardpackDrafts").insertOne(
                        cardpackDraftsDefault({
                            cardpackId,
                            userId: user.id,
                        })
                    );
                    return cardpackId;
                })
                .then(async (cardpackId) =>
                    // create pack : add cardpack id to user
                    {
                        await db.collection("users").updateOne(
                            { _id: user.id },
                            {
                                $push: {
                                    cardPacks: cardpackId,
                                },
                            }
                        );
                        return cardpackId;
                    }
                )
                .then((cardpackId) =>
                    // if all succeeds redirect to that cardpack
                    push(`/editor/${cardpackId}`)
                ),
        { refetchOnWindowFocus: false, enabled: !!user && isReady, retry: 0 }
    );

    return (
        <main id="CreatePack" className="px-[540px]">
            <div className="my-1 text-lg font-semibold text-blue-600 title-1">
                Card Pack Editor
            </div>
            <div className="flex justify-center placeholder-wrapper">
                {(isSuccess || isLoading || isIdle) && (
                    <PlaceholderColumn presetKey="loading" />
                )}
                {isError && <PlaceholderColumn presetKey="error" />}
            </div>
        </main>
    );
}
