import draftjsToHtml from "draftjs-to-html";
import { AnimatePresence, motion } from "framer-motion";
import millify from "millify";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useReducer } from "react";
import Button from "@components/general/Button";
import { useQuery } from "react-query";
import ago from "s-ago";
import { BrowseContext } from "../../pages/browse";
import { useCardpackFunctions_incrementStats } from "../Mongo/CardPack/useCardPackFunctions";
import useCreatePackMutation from "../Mongo/CardPack/useCreatePackMutation";
import usePublishPackMutation from "../Mongo/CardPack/usePublishPackMutation";
import { useMongo } from "../Mongo/MongoUtils";
import PlaceholderColumn from "../PlaceholderColumn";
import { MyHoverTooltip } from "../Tooltip/MyClickTooltip";
import { DUPLICATE_SVG, LIKE_SVG, SHARE_SVG } from "./_icons";
import Link from "next/link";
import { normalizeImageSrc } from "@components/general/NormalizedImage";
const previewAnim = {
    initial: {
        scale: 0.98,
        opacity: 0,
        top: 0,
        position: "absolute",
        width: "100%",
    },
    animate: {
        y: 0,
        opacity: 1,
        scale: 1,
        top: 0,
        position: "relative",
        width: "100%",
    },
    exit: {
        opacity: 0,
        scale: 0.98,
        top: 0,
        position: "absolute",
        width: "100%",
    },
};

export default function CardPackPreview() {
    const {
        selectedState: [selected],
    } = useContext(BrowseContext);

    const { db, isAnon } = useMongo();
    const { data, isSuccess, isError, isIdle, isLoading } = useQuery(
        ["cardpack-browser-preview", selected, isAnon],
        () =>
            db
                .collection(selected.collection)
                .aggregate([
                    {
                        $match: {
                            _id: selected.id,
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
                            cardsPreview: { $slice: ["$cards", 8] },
                            totalCards: {
                                $cond: {
                                    if: { $isArray: "$cards" },
                                    then: { $size: "$cards" },
                                    else: 0,
                                },
                            },
                        },
                    },
                ])
                .then((data) => data[0]),
        { refetchOnWindowFocus: false, enabled: !!db && !!selected }
    );
    const router = useRouter();
    return (
        <div className="preview">
            <AnimatePresence>
                {isIdle && (
                    <motion.div key="idle" className="inner" {...previewAnim}>
                        <div className="placeholder-wrapper flex justify-center">
                            <PlaceholderColumn
                                options={{
                                    imageKey: "studyCat",
                                    message: {
                                        title: "Choose a pack to preview",
                                        description:
                                            "or click below to make your own",
                                    },
                                    action: {
                                        label: "Create A Card Pack",
                                        props: {
                                            onClick: () => {
                                                router.push("/editor");
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </motion.div>
                )}
                {isLoading && (
                    <motion.div
                        key="loading"
                        className="inner"
                        {...previewAnim}
                    >
                        <div className="placeholder-wrapper flex justify-center">
                            <PlaceholderColumn presetKey="loading" />
                        </div>
                    </motion.div>
                )}
                {isError && (
                    <motion.div key="error" className="inner" {...previewAnim}>
                        <div className="placeholder-wrapper flex justify-center">
                            <PlaceholderColumn presetKey="error" />
                        </div>
                    </motion.div>
                )}
                {isSuccess && data && (
                    <CardPackPreviewInner key={data._id} data={data} />
                )}
                {isSuccess && !data && (
                    <motion.div key="error" className="inner" {...previewAnim}>
                        <div className="placeholder-wrapper flex justify-center">
                            <PlaceholderColumn presetKey="error" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function CardPackPreviewInner({ data }) {
    const router = useRouter();

    return (
        <motion.div
            // key={data._id}
            className="inner"
            initial={{
                // y: "-48",
                scale: 0.98,
                opacity: 0,
                position: "absolute",
            }}
            animate={{
                y: 0,
                opacity: 1,
                scale: 1,
                position: "relative",
            }}
            exit={{
                // y: "48",
                opacity: 0,
                scale: 0.98,
                position: "absolute",
            }}
        >
            <Header data={data} />
            <div className="w-full my-6 mx-0 opacity-20 h-[2px] bg-blue-600" />
            <Details data={data} />
            <div className="w-full my-6 mx-0 opacity-20 h-[2px] bg-blue-600" />
            <div className="content-preview">
                <div className="text-blue-600 font-bold mx-2 my-0">
                    Interactive Study Modes
                </div>
                <div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                            router.push(`/cardpack/${data._id}/match`);
                        }}
                    >
                        Match
                    </Button>
                </div>
            </div>
            <div className="w-full my-6 mx-0 opacity-20 h-[2px] bg-blue-600" />
            <ContentPreview data={data} />
        </motion.div>
    );
}

function ContentPreview({ data: { totalCards, cardsPreview } }) {
    return (
        <div className="content-preview">
            <div className="text-blue-600 font-bold mx-2 my-0">
                Cards ({totalCards})
            </div>
            {cardsPreview.map(({ id, term, definition }) => (
                <div className="row" key={id}>
                    <Field data={term} label="Term" />
                    <Field data={definition} label="Definition" />
                </div>
            ))}
        </div>
    );
}
function Field({ data: { content, id, image }, label }) {
    const imgSrc = normalizeImageSrc(image);
    return (
        <div className="field">
            {imgSrc && (
                <div className="img">
                    <Image
                        className="object-cover"
                        width="85"
                        height="76"
                        src={imgSrc}
                        alt="card icon"
                    />
                </div>
            )}
            <div className="content-wrapper">
                <div className="label text-blue-600 font-bold mx-2 my-0">
                    {label}
                </div>
                <div
                    className="break-words"
                    dangerouslySetInnerHTML={{ __html: draftjsToHtml(content) }}
                />
            </div>
        </div>
    );
}

const localStatsReducer = (state, { action, data }) => {
    switch (action) {
        case "like":
            return { ...state, likes: state.likes + 1 };
        case "share":
            return { ...state, shares: state.shares + 1 };
        case "duplicate":
            return { ...state, duplicates: state.duplicates + 1 };
        case "set":
            return data;
    }
};

function Header({ data }) {
    const {
        likes = 0,
        shares = 0,
        duplicates = 0,
        title,
        authorDetails,
    } = data;
    const {
        selectedState: [selected],
    } = useContext(BrowseContext);
    const createMutation = useCreatePackMutation({
        duplicateCardpackId: selected.id,
    });
    const mutation = useCardpackFunctions_incrementStats();
    const router = useRouter();
    const [localStats, setLocalStats] = useReducer(localStatsReducer, {
        likes,
        shares,
        duplicates,
    });
    useEffect(() => {
        if (data)
            setLocalStats({
                action: "set",
                data: {
                    likes: data.likes,
                    shares: data.shares,
                    duplicates: data.duplicates,
                },
            });
    }, [data]);

    function sendLike() {
        if (mutation.isIdle)
            mutation.mutate(
                {
                    action: "likes",
                    cardPackId: selected.id,
                },
                {
                    onSuccess: () => {
                        setLocalStats({ action: "like" });
                        mutation.reset();
                    },
                }
            );
    }
    function sendShare() {
        navigator.clipboard.writeText(
            `https://flippy.cards/cardpack/${selected.id}`
        );
        if (mutation.isIdle)
            mutation.mutate(
                {
                    action: "shares",
                    cardPackId: selected.id,
                },
                {
                    onSuccess: () => {
                        setLocalStats({ action: "share" });
                        mutation.reset();
                    },
                }
            );
    }
    function sendDuplicate() {
        if (mutation.isIdle)
            mutation.mutate(
                {
                    action: "duplicates",
                    cardPackId: selected.id,
                },
                {
                    onSuccess: () => {
                        setLocalStats({ action: "duplicate" });
                        if (createMutation.isIdle) createMutation.mutate();
                        mutation.reset();
                    },
                }
            );
    }
    const { user } = useMongo();
    const publishMutation = usePublishPackMutation({
        cardPackId: selected.id,
    });

    return (
        <div className="header">
            <div className="title-1 text-lg font-semibold text-blue-600 my-1 title">
                {title}
            </div>
            <div className="controls">
                {selected.collection !== "cardpackDrafts" && (
                    <>
                        <MyHoverTooltip
                            TriggerContent={
                                <button className="icon-btn" onClick={sendLike}>
                                    <div className="icon">{LIKE_SVG}</div>
                                    <div className="break-words">
                                        {millify(localStats.likes || 0)}
                                    </div>
                                </button>
                            }
                            TooltipContent={<div>Send A Like</div>}
                        />
                        <MyHoverTooltip
                            TriggerContent={
                                <button
                                    className="icon-btn"
                                    onClick={sendShare}
                                >
                                    <div className="icon">{SHARE_SVG}</div>
                                    <div className="break-words">
                                        {millify(localStats.shares || 0)}
                                    </div>
                                </button>
                            }
                            TooltipContent={<div>Copy Link</div>}
                        />
                        <MyHoverTooltip
                            TriggerContent={
                                <button
                                    className="icon-btn"
                                    onClick={sendDuplicate}
                                >
                                    <div className="icon">{DUPLICATE_SVG}</div>
                                    <div className="break-words">
                                        {millify(localStats.duplicates || 0)}
                                    </div>
                                </button>
                            }
                            TooltipContent={<div>Duplicate</div>}
                        />
                    </>
                )}
                {authorDetails[0]._id === user.id && (
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                            router.push(`/editor/${selected.id}`);
                        }}
                    >
                        Edit
                    </Button>
                )}
                {selected.collection === "cardpackDrafts" ? (
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => {
                            publishMutation.mutate();
                            // router.push(`/cardpack/${selected.id}`);
                        }}
                    >
                        Publish
                    </Button>
                ) : (
                    <Link
                        href={`/cardpack/${selected.id}`}
                        onClick={() => {
                            window?.umami?.("Click - Navbar - Browse Packs");
                        }}
                    >
                        <Button size="sm" variant="primary">
                            Open
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
}

function Details({
    data: {
        tags = [],
        description,
        lastModified,
        authorDetails: { image, username = "Anon" },
        views = 0,
    },
}) {
    const {
        selectedState: [selected],
    } = useContext(BrowseContext);
    const imgSrc =
        normalizeImageSrc(image) ||
        "https://ucarecdn.com/8367c6e0-2a0f-40c0-9bbb-7bf74754a3a5/";

    return (
        <div className="details">
            <div className="top">
                <div className="author">
                    <div className="img">
                        <Image
                            className="object-cover"
                            width="32"
                            height="32"
                            src={imgSrc}
                            alt={username}
                        />
                    </div>
                    <div className="username text-blue-600 font-bold mx-2 my-0">
                        {username}
                    </div>
                </div>
                <div className="tags m-0 font-bold text-base color-blue-600">
                    {tags.map((tag, index) => (
                        <div key={index} className="pill">
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-blue-600 font-bold mx-2 my-0 middle">
                {[
                    lastModified && "Last Updated " + ago(lastModified),
                    selected.collection !== "cardpackDrafts" &&
                        millify(views) + " Views",
                ]
                    .filter(Boolean)
                    .join(" · ")}
            </div>
            {description && (
                <div className=" mt-2 mx-0 text-blue-400 break-words  bottom">
                    {description}
                </div>
            )}
        </div>
    );
}
