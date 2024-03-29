import { connectToAtlas } from "lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body.query || typeof req.body.query !== "string") {
            res.status(401).json("Unauthorized");
            return;
        }
        let query = JSON.stringify(req.body.query);
        let subject = JSON.stringify(req.body.subject);
        let page = Number(JSON.stringify(req.body.page));
        let limit = 12;
        let cursor;

        const { db: cachedDb, client, disconnect } = await connectToAtlas();

        try {
            // Process a POST request
            let collection = cachedDb.collection("cardpacks");

            // console.info("query: ", query);
            cursor = await collection.aggregate([
                {
                    $library: {
                        index: "default",
                        text: {
                            query,
                            path: {
                                wildcard: "*",
                            },
                        },
                    },
                },
                {
                    $match: {
                        visibility: "public",
                    },
                },
                {
                    $project: {
                        _id: 1,
                        title: 1,
                        subject: { $first: "$tags" },
                        // author: 1,
                        cards: 1,
                        image: 1,
                    },
                },
                {
                    $facet: {
                        result: [
                            // { // get author data too
                            //   $lookup: {
                            //     from: "users",
                            //     localField: "author",
                            //     foreignField: "_id",
                            //     as: "author",
                            //   },
                            // },
                            {
                                $set: {
                                    cardsCount: { $size: "$cards" },
                                    previewCards: { $slice: ["$cards", 5] },
                                },
                            },
                            { $unset: "cards" },
                            { $skip: page * limit },
                            { $limit: limit },
                        ],
                        subjectCounts: [
                            {
                                $group: {
                                    _id: "$subject",
                                    count: { $count: {} },
                                },
                            },
                        ],
                        totalCount: [
                            {
                                $group: {
                                    _id: null,
                                    count: { $count: {} },
                                },
                            },
                        ],
                    },
                },
            ]);
            let result = await cursor.toArray();
            res.status(200).json({
                results: result,
            });
        } catch (e) {
            res.status(400).json("something went wrong!");
            console.log(e);
        } finally {
            if (cursor) await cursor.close();
        }
    } else {
        // Handle any other HTTP method
        res.status(400).json({ message: "Invalid Parameters" });
    }
}
