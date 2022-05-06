import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import {
    MongoApp,
    useMongo,
    WaitForMongo,
} from "../../components/Mongo/MongoUtils";
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
            router.replace(router, undefined, { shallow: true });
        }
    }, [metadata, router]);

    return (
        <>
            <Head>
                {metadata ? (
                    <>
                        <title key="title">
                            Card Pack - {metadata.description} - Flashcard App
                        </title>
                        {/* google metadata */}
                        <meta
                            name="description"
                            content={metadata.description}
                            key="description"
                        />
                        <meta
                            name="robots"
                            content={["nofollow", metadata.noIndex && "noindex"]
                                .filter(Boolean)
                                .join(", ")}
                            key="robots"
                        />
                        {/* facebook */}
                        <meta
                            property="og:type"
                            content="website"
                            key="og:type"
                        />
                        <meta
                            key="og:title"
                            property="og:title"
                            content={metadata.title}
                        />
                        <meta
                            key="og:description"
                            property="og:description"
                            content={metadata.description}
                        />
                        <meta
                            key="og:url"
                            property="og:url"
                            content={metadata.url}
                        />
                        <meta
                            key="og:image"
                            property="og:image"
                            content={metadata.image}
                        />
                        {/* twitter */}
                        <meta
                            key="twitter:card"
                            name="twitter:card"
                            content="summary_large_image"
                        />
                        <meta
                            key="twitter:url"
                            name="twitter:url"
                            content="https://awesomechoi11.lhr.rocks/card-pack/9125f846ec1e972a"
                        />
                        <meta
                            key="twitter:title"
                            name="twitter:title"
                            content={metadata.title}
                        />
                        <meta
                            key="twitter:description"
                            name="twitter:description"
                            content={metadata.description}
                        />
                        <meta
                            key="twitter:image"
                            name="twitter:image"
                            content={metadata.image}
                        />
                    </>
                ) : (
                    <>
                        <title>404 - Cardpack Not Found - Flashcard App</title>
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
                <WaitForMongo>
                    <Inner />
                </WaitForMongo>
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

    const cdnUrl =
        `${cardpack?.image?.value?.cdnUrl}-/overlay/e8cc658f-c96e-4463-aff9-83434e3e3898/50px50p/10p,90p/100p/` ||
        "https://ucarecdn.com/23bcd3ee-07fe-4333-bb7a-f306d9b67efc/-/preview/-/quality/smart/";

    if (!cardpack) {
        return {
            props: {
                metadata: {
                    description:
                        "404 Cardpack Not Found - Flippy - Flashcard App",
                    title: "Cardpack Not Found",
                    image: cdnUrl,
                    url: `https://flippy.cards/card-pack/${
                        cardpack._id
                    }?slug=${slugify(cardpack.title)}`,
                    noIndex: true,
                },
            },
        };
    }
    // By returning { props: { posts } }, the Blog component
    // will receive `posts` as a prop at build time

    return {
        props: {
            metadata: {
                description: cardpack
                    ? `${cardpack.cards.length} cards - ${cardpack.tags.join(
                          ", "
                      )} - ${cardpack.description}`
                    : null,
                title: cardpack.title,
                image: cdnUrl,
                url: `https://flippy.cards/card-pack/${
                    cardpack._id
                }?slug=${slugify(cardpack.title)}`,
                noIndex: cardpack.visibility !== "public",
            },
        },
        revalidate: 10, // seconds
    };
}
