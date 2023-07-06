import { connectToAtlas, db } from "lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body.query || typeof req.body.query !== "string") {
      res.status(401).json("Unauthorized");
    }
    let query = JSON.stringify(req.body.query);
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
      if (!query) {
        throw Error("query invalid");
      }
      cursor = await collection.aggregate([
        {
          $search: {
            index: "testpackAutocomplete",
            autocomplete: {
              query,
              path: "title",
            },
          },
        },
        { $limit: 5 },
        { $project: { _id: 0, title: 1 } },
      ]);
      let result = await cursor.toArray();
      res.status(200).json({
        results: result,
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
