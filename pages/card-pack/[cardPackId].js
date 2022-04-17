import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { useMongo } from "../../components/Mongo/MongoUtils";
import { useQuery } from "react-query";
import CardSwiper from "../../components/CardPack/CardSwiper/CardSwiper";
import LargeCardBanner from "../../components/CardPack/CardBanner/Large.CardBanner";
import CardDisplay from "../../components/CardPack/CardDisplay/CardDisplay";
import { useCardpackFunctions_incrementStats } from "../../components/Mongo/CardPack/useCardPackFunctions";
import { useEffect } from "react";
import PlaceholderColumn from "../../components/PlaceholderColumn";

export default function CardPack() {
    return (
        <>
            <Head>
                <title>Card Pack - CardBox - Flashcard App</title>
                <meta name="description" content="CardBox - Flashcard App" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <main id="card-pack">
                <Inner />
            </main>
        </>
    );
}

function Inner() {
    const { query, isReady } = useRouter();
    const { db } = useMongo();

    const mutation = useCardpackFunctions_incrementStats();
    useEffect(() => {
        if (query.cardPackId)
            mutation.mutate({
                action: "views",
                cardPackId: query.cardPackId,
            });
    }, [isReady]);

    const { data, isLoading, isIdle, isSuccess, isError } = useQuery(
        ["card-pack", query.cardPackId],
        () =>
            db
                .collection("cardpacks")
                .aggregate([
                    {
                        $match: {
                            _id: query.cardPackId,
                            visibility: { $in: ["public", "hidden"] },
                        },
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "author",
                            foreignField: "_id",
                            as: "authorDetails",
                        },
                    },
                    {
                        $project: {
                            image: 1,
                            title: 1,
                            description: 1,
                            tags: 1,
                            views: 1,
                            likes: 1,
                            shares: 1,
                            duplicates: 1,
                            lastModified: 1,
                            authorDetails: 1,
                            lastModified: 1,
                            cards: 1,
                        },
                    },
                ])
                .then((data) => data[0]),
        {
            refetchOnWindowFocus: false,
            enabled: Boolean(isReady && query.cardPackId),
        }
    );
    console.log(data);
    if (isIdle || isLoading)
        return (
            <div className="placeholder-wrapper">
                <PlaceholderColumn presetKey="loading" />
            </div>
        );
    if (isError) return;
    <div className="placeholder-wrapper">
        <PlaceholderColumn presetKey="error" />
    </div>;

    if (isSuccess && data)
        return (
            <>
                <CardSwiper data={data} />
                <div className="divider" />
                <LargeCardBanner data={data} />
                <div className="divider" />
                <CardDisplay data={data} />
            </>
        );

    return <PlaceholderColumn presetKey="error" />;
}
