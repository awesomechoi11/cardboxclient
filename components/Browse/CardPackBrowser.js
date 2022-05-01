import clsx from "clsx";
import { useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { BrowseContext } from "../../pages/browse";
import { useMongo } from "../Mongo/MongoUtils";
import Image from "next/image";
import PlaceholderColumn from "../PlaceholderColumn";
import { useRouter } from "next/router";
import { useIsMobile } from "@components/mediaQueryHooks";
// import ReactGA from "react-ga";

export default function CardPackBrowser() {
    const [currentPage, setCurrentPage] = useState(0);

    const { user } = useMongo();

    const pages = [
        {
            label: "Community Packs",
            collection: "cardpacks",
            query: (db) =>
                db.collection("cardpacks").aggregate([
                    {
                        $match: {
                            visibility: "public",
                        },
                    },
                    {
                        $sort: {
                            lastModified: -1,
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
                            lastModified: 1,
                            totalCards: {
                                $cond: {
                                    if: { $isArray: "$cards" },
                                    then: { $size: "$cards" },
                                    else: "NA",
                                },
                            },
                            authorDetails: {
                                image: 1,
                                username: 1,
                            },
                        },
                    },
                ]),
        },
        {
            label: "My Published Packs",
            collection: "cardpacks",
            query: (db) =>
                db.collection("cardpacks").find({
                    author: user.id,
                }),
        },
        {
            label: "My Drafts",
            collection: "cardpackDrafts",
            query: (db) =>
                db.collection("cardpackDrafts").find({
                    author: user.id,
                }),
        },
    ];
    return (
        <div className="browser">
            <div className="nav">
                {pages.map(({ label }, index) => (
                    <Button
                        variant={
                            index === currentPage ? "primary" : "secondary"
                        }
                        size="sm"
                        key={label}
                        onClick={() => {
                            // ReactGA.event({
                            //     category: "Browse",
                            //     action: "click",
                            //     label,
                            // });
                            setCurrentPage(index);
                        }}
                        className={clsx(index === currentPage && "active")}
                    >
                        {label}
                    </Button>
                ))}
            </div>

            <BrowserResults data={pages[currentPage]} />
        </div>
    );
}

function BrowserResults({ data: { query, label, collection } }) {
    const { user, db, isAnon } = useMongo();
    const { isLoading, isError, isIdle, isSuccess, data, refetch } = useQuery(
        ["card-pack-browser", user.id, label, isAnon],
        () => query(db),
        { refetchOnWindowFocus: false, enabled: !!db }
    );
    const router = useRouter();

    return (
        <div className="browser-results">
            {isIdle && <PlaceholderColumn presetKey="loading" />}
            {isLoading && <PlaceholderColumn presetKey="loading" />}
            {isError && <PlaceholderColumn presetKey="error" />}
            {isSuccess &&
                (data?.length ? (
                    data.map((cardData, index) => (
                        <CardPreviewDefault
                            key={cardData._id}
                            data={cardData}
                            collection={collection}
                        />
                    ))
                ) : (
                    <PlaceholderColumn
                        options={{
                            imageKey: "catOnBook",
                            message: {
                                title: "Looks a lil empty here...",
                                description: "Make some cards!",
                            },
                            action: {
                                label: "Create A Card Pack",
                                props: {
                                    onClick: () => {
                                        router.push("/card-pack-editor");
                                    },
                                },
                            },
                        }}
                    />
                ))}
        </div>
    );
}

function CardPreviewDefault({ data, collection }) {
    const {
        title = "",
        description = "",
        tags = [],
        totalCards = 0,
        image,
        _id,
    } = data;

    const {
        selectedState: [selected, setSelected],
    } = useContext(BrowseContext);
    const isMobile = useIsMobile();
    const imgSrc = image?.value?.cdnUrl;
    const router = useRouter();
    return (
        <div
            className={clsx(
                "card-preview-default",
                selected?.id === _id && "active"
            )}
            tabIndex="0"
            onFocus={() => {
                if (isMobile) {
                    router.push(`/card-pack/${_id}`);
                } else {
                    setSelected({
                        id: _id,
                        collection,
                    });
                }
            }}
        >
            {imgSrc && (
                <div className="left">
                    <Image
                        src={imgSrc}
                        alt="preview"
                        layout="fill"
                        // width={isMobile ? "64rem" : "144rem"}
                        // height="106.29rem"
                        objectFit="cover"
                    />
                </div>
            )}
            <div className="right">
                <div className="subtitle-2 title">{title}</div>
                <div className="description-1 details">
                    {[totalCards + " cards", ...tags].join(", ")}
                </div>
                <div className="description-1 details">{description}</div>
            </div>
        </div>
    );
}
