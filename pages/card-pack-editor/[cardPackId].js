import { useIsMobile } from "@components/mediaQueryHooks";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useQuery } from "react-query";
import CreatePackDetailsForm from "../../components/CreatePack/CreatePackDetailsForm";
import CreatePackDisplay from "../../components/CreatePack/CreatePackDisplay";
import { useMongo, WaitForMongo } from "../../components/Mongo/MongoUtils";
import Navbar from "../../components/Navbar";
import PlaceholderColumn from "../../components/PlaceholderColumn";

export default function CreatePack() {
    const isMobile = useIsMobile();
    return (
        <>
            <Head>
                <title key="title">
                    Card Pack Editor - Flippy - Flashcard App
                </title>
            </Head>
            <Navbar />
            {isMobile ? (
                <div className="placeholder-wrapper flex justify-center">
                    <PlaceholderColumn
                        options={{
                            imageKey: "catOnBook",
                            message: {
                                title: "Sorry, Not Ready Yet :(",
                                description:
                                    "Card Pack Editing is not avaiable in mobile yet!",
                            },
                        }}
                    />
                </div>
            ) : (
                <>
                    (
                    <WaitForMongo>
                        <Main />
                    </WaitForMongo>
                    )
                </>
            )}
        </>
    );
}

function Main() {
    const { query, isReady } = useRouter();
    const { cardPackId } = query;

    const { isAnon } = useMongo();
    const router = useRouter();

    return isAnon ? (
        <div className="placeholder-wrapper flex justify-center">
            <PlaceholderColumn
                options={{
                    imageKey: "oopsCat",
                    message: {
                        title: "Not Allowed",
                        description:
                            "You need an account to create or edit card packs!",
                    },
                    action: {
                        label: "Browse Packs Instead",
                        props: {
                            onClick: () => {
                                router.push("/browse");
                            },
                        },
                    },
                }}
            />
        </div>
    ) : (
        <>
            {!isReady && (
                <div className="placeholder-wrapper flex justify-center">
                    <PlaceholderColumn presetKey="loading" />
                </div>
            )}
            {isReady && <Inner cardPackId={cardPackId} />}
        </>
    );
}

export const CardPackDataContext = createContext();
CardPackDataContext.displayName = "CardPackDataContext";
function Inner({ cardPackId }) {
    const { user, db, isAnon } = useMongo();
    const result = useQuery(
        ["card-pack-editor", user.id, cardPackId, isAnon],
        () =>
            db.collection("cardpackDrafts").findOne({
                _id: cardPackId,
                author: user.id,
            }),
        {
            // refetchOnWindowFocus: true,
            enabled: !!db,
        }
    );

    return (
        <main
            id="CreatePack"
            className="px-[540rem] relative flex flex-col items-center gap-[48rem] mb-[128rem]"
        >
            {result.isLoading && <PlaceholderColumn presetKey="loading" />}
            {result.isError && <PlaceholderColumn presetKey="error" />}
            {result.isSuccess &&
                (result.data ? (
                    <CardPackDataContext.Provider value={result}>
                        <div className="title-1">Card Pack Editor</div>
                        <CreatePackDetailsForm />
                        <div className="divider" />
                        <CreatePackDisplay />
                    </CardPackDataContext.Provider>
                ) : (
                    <PlaceholderColumn
                        options={{
                            imageKey: "oopsCat",
                            message: {
                                title: "Something went wrong...",
                                description: (
                                    <>
                                        Card Pack might be deleted. Otherwise,
                                        Try refreshing! If it keeps persisting
                                        please reach out to us on{" "}
                                        <Link
                                            href="https://discord.gg/QC3yHFySAV"
                                            target="_blank"
                                            className="text-blue-600 font-bold mx-2 my-0"
                                        >
                                            discord
                                        </Link>
                                        !
                                    </>
                                ),
                            },
                        }}
                    />
                ))}
        </main>
    );
}

// .aggregate([
//     {
//         $match: {
//             _id: user.id,
//         },
//     },
//     {
//         $lookup: {
//             // from: <collection to join>,
//             from: "cardpacks",
//             // localField: <field from the input documents>,
//             localField: "cardpacks",
//             // foreignField: <field from the documents of the "from" collection>,
//             foreignField: "_id",
//             // as: <output array field>
//             as: "cardpacks",
//         },
//     },
// ])
