import { useQuery } from "react-query";
import { useRouter } from "router";

export default function OtherPacksBar() {
    const { isReady, query } = useRouter();

    const { isIdle, isError, isLoading, isSuccess, data } = useQuery(
        ["other-packs-bar"],
        (db) =>
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
                // {
                //     $lookup: {
                //         from: "users",
                //         localField: "author",
                //         foreignField: "_id",
                //         as: "authorDetails",
                //     },
                // },
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
                        // authorDetails: {
                        //     image: 1,
                        //     username: 1,
                        // },
                    },
                },
            ]),
        { refetchOnWindowFocus: false, enabled: isReady }
    );

    return <div className="other-packs-bar">dasdas</div>;
}
