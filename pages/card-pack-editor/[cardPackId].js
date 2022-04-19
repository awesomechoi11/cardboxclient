import Head from "next/head";
import CreatePackDetailsForm from "../../components/CreatePack/CreatePackDetailsForm";
import CreatePackDisplay from "../../components/CreatePack/CreatePackDisplay";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { useMongo } from "../../components/Mongo/MongoUtils";
import { createContext } from "react";
import { useQuery } from "react-query";
import CreatePackPublish from "../../components/CreatePack/CreatePackPublish";
import PlaceholderColumn from "../../components/PlaceholderColumn";
import Link from "next/link";

export default function CreatePack() {
    const { query, isReady } = useRouter();
    const { cardPackId } = query;

    const { isAnon } = useMongo();

    return (
        <>
            <Head>
                <title>Card Pack Editor - Flippy - Flashcard App</title>
                <meta name="description" content="Flippy - Flashcard App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            {isAnon ? (
                <>not verified</>
            ) : (
                <>
                    {!isReady && <PlaceholderColumn presetKey="loading" />}
                    {isReady && <Inner cardPackId={cardPackId} />}
                </>
            )}
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

    console.log(result);

    return (
        <main id="CreatePack">
            {result.isLoading && <PlaceholderColumn presetKey="loading" />}
            {result.isError && <PlaceholderColumn presetKey="error" />}
            {result.isSuccess &&
                (result.data ? (
                    <CardPackDataContext.Provider value={result}>
                        <div className="title-1">Card Pack Editor</div>
                        <CreatePackDetailsForm />
                        {/* <CreatePackPublish /> */}
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
                                        <Link href="https://discord.gg/QC3yHFySAV">
                                            <a
                                                target="_blank"
                                                className="subtitle-2"
                                            >
                                                discord
                                            </a>
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
