import { useIsMobile } from "@components/mediaQueryHooks";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { createContext } from "react";
import { useQuery } from "react-query";
import CreatePackDetailsForm from "../../components/CreatePack/CreatePackDetailsForm";
import CreatePackDisplay from "../../components/CreatePack/CreatePackDisplay";
import { useMongo, WaitForMongo } from "../../components/Mongo/MongoUtils";
import Navbar from "../../components/nav/Navbar";
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
                <div className="flex justify-center placeholder-wrapper">
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
        <div className="flex justify-center placeholder-wrapper">
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
                                router.push("/search");
                            },
                        },
                    },
                }}
            />
        </div>
    ) : (
        <>
            {!isReady && (
                <div className="flex justify-center placeholder-wrapper">
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
        ["editor", user.id, cardPackId, isAnon],
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
            className="px-[540px] relative flex flex-col items-center gap-[48px] mb-[128px]"
        >
            {result.isLoading && <PlaceholderColumn presetKey="loading" />}
            {result.isError && <PlaceholderColumn presetKey="error" />}
            {result.isSuccess &&
                (result.data ? (
                    <CardPackDataContext.Provider value={result}>
                        <div className="my-1 text-lg font-semibold text-blue-600 title-1">
                            Card Pack Editor
                        </div>
                        <CreatePackDetailsForm />
                        <div className="w-full my-6 mx-0 opacity-20 h-[2px] bg-blue-600" />
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
                                            className="mx-2 my-0 font-bold text-blue-600"
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
