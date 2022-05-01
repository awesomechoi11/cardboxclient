import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { MongoApp, useMongo } from "../../components/Mongo/MongoUtils";
import { useQuery } from "react-query";
import CardSwiper from "../../components/CardPack/CardSwiper/CardSwiper";
import LargeCardBanner from "../../components/CardPack/CardBanner/Large.CardBanner";
import CardDisplay from "../../components/CardPack/CardDisplay/CardDisplay";
import { useCardpackFunctions_incrementStats } from "../../components/Mongo/CardPack/useCardPackFunctions";
import { useEffect } from "react";
import PlaceholderColumn from "../../components/PlaceholderColumn";
import * as Realm from "realm-web";
import slugify from "slugify";

export default function CardPack({ metadata }) {
    const router = useRouter();
    useEffect(() => {
        if (
            metadata?.title &&
            router.isReady &&
            router?.query?.slug !== slugify(metadata.title)
        ) {
            router.query.slug = slugify(metadata.title);
            router.push(router, undefined, { shallow: true });
        }
    }, [metadata, router]);

    return (
        <>
            <Head>
                <title>Card Pack - Flippy - Flashcard App</title>
                {metadata ? (
                    <>
                        <meta
                            name="description"
                            content={metadata.description}
                        />
                        <meta
                            name="robots"
                            content={["nofollow", metadata.noIndex && "noindex"]
                                .filter(Boolean)
                                .join(", ")}
                        />
                    </>
                ) : (
                    <>
                        <meta
                            name="description"
                            content="404 - Cardpack Not Found"
                        />
                        <meta name="robots" content="nofollow, noindex" />
                    </>
                )}
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
    const { query, isReady, isFallback } = useRouter();
    const { db, isAnon } = useMongo();

    const mutation = useCardpackFunctions_incrementStats();
    useEffect(() => {
        if (query.cardPackId)
            mutation.mutate({
                action: "views",
                cardPackId: query.cardPackId,
            });
    }, [isReady]);

    const { data, isLoading, isIdle, isSuccess, isError } = useQuery(
        ["card-pack", query.cardPackId, isAnon],
        () =>
            db
                .collection("cardpacks")
                .aggregate([
                    {
                        $match: {
                            _id: query.cardPackId,
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
    if (isIdle || isLoading || isFallback)
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

    return (
        <div className="placeholder-wrapper">
            <PlaceholderColumn presetKey="error" />
        </div>
    );
}

// This function gets called at build time
export async function getStaticPaths() {
    // Call an external API endpoint to get posts
    const apiCreds = Realm.Credentials.apiKey(process.env.MONGO_API_KEY);
    const apiUser = await MongoApp.logIn(apiCreds);
    const cardpacks = await apiUser.functions.getCardPackIds();
    // Get the paths we want to pre-render based on posts
    const paths = cardpacks.map((pack) => ({
        params: {
            cardPackId: pack._id,
        },
    }));

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: true };
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps({ params }) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    const apiCreds = Realm.Credentials.apiKey(process.env.MONGO_API_KEY);
    const apiUser = await MongoApp.logIn(apiCreds);
    const cardpack = await apiUser.functions.getCardPackById(params.cardPackId);

    if (!cardpack) {
        return {
            props: {
                metadata: {
                    description:
                        "404 Cardpack Not Found - Flippy - Flashcard App",
                    title: "Cardpack Not Found",
                    noIndex: true,
                },
            },
        };
    }
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time
    const metadata = {
        description: cardpack
            ? `${cardpack.cards.length} cards - ${cardpack.tags.join(", ")} - ${
                  cardpack.description
              }`
            : null,
        title: cardpack.title,
        noIndex: cardpack.visibility !== "public",
    };
    return {
        props: {
            metadata,
        },
        revalidate: 60 * 60, // 1hr
    };
}
