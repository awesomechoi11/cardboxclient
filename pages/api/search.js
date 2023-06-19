import { connectToAtlas } from "lib/mongodb";

export default async function handler(req, res) {
    if (req.method === "POST") {
        if (!req.body.query || typeof req.body.query !== "string") {
            res.status(401).json("Unauthorized");
        }
        let query = JSON.stringify(req.body.query);
        try {
            // Process a POST request
            const { db } = await connectToAtlas();
            let collection = db.collection("cardpacks");

            console.info("query: ", query);
            let result = await collection
                .aggregate([
                    {
                        $search: {
                            index: "cards",
                            text: {
                                query,
                                path: {
                                    wildcard: "*",
                                },
                            },
                        },
                    },
                    {
                        $facet: {
                            results: [
                                {
                                    $limit: 12,
                                },
                            ],
                            totalCount: [
                                {
                                    $count: "count",
                                },
                            ],
                        },
                    },
                    { $limit: 20 },
                    // { $project: { _id: 0, title: 1 } },
                ])
                .toArray();
            res.status(200).json({
                results: result[0].results,
                total: result[0].totalCount[0].count,
            });
        } catch (e) {
            res.status(400).json("something went wrong!");
            console.log(e);
        }
    } else {
        // Handle any other HTTP method
        res.status(400).json({ message: "Invalid Parameters" });
    }
}
