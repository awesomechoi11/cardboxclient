import { connectToAtlas, db } from "lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // console.log(req.body);
    if (!req.body.query || typeof req.body.query !== "string") {
      res.status(401).json("Unauthorized");
      return;
    }
    let query = JSON.stringify(req.body.query);
    let subject = JSON.stringify(req.body.subject);
    let page = Number(JSON.stringify(req.body.page));
    let limit = 12;
    console.log(query, subject, page);
    let cursor;

    let newConnection;
    let cachedDb;
    if (!db) {
      newConnection = await connectToAtlas();
      cachedDb = newConnection.db;
    }

    try {
      // Process a POST request
      let collection = cachedDb.collection("testpacks");

      console.info("query: ", query);
      cursor = await collection.aggregate([
        {
          $search: {
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
            tags: 1,
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
                  subject: { $first: "$tags" },
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
      // console.log(result);
      res.status(200).json({
        results: result,
        // total: result[0].totalCount[0].count,
      });

      // await disconnect();
    } catch (e) {
      res.status(400).json("something went wrong!");
      console.log(e);
    } finally {
      if (cursor) cursor.close();
      newConnection.disconnect();
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ message: "Invalid Parameters" });
  }
}
