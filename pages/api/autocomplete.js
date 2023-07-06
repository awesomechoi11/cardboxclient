import { connectToAtlas } from "lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    if (!req.body.query || typeof req.body.query !== "string") {
      res.status(401).json("Unauthorized");
    }
    let query = JSON.stringify(req.body.query);
    try {
      // Process a POST request
      const { db, disconnect } = await connectToAtlas();
      let collection = db.collection("testpacks");

      console.info("query: ", query);
      if (!query) {
        throw Error("query invalid");
      }
      let cursor = await collection.aggregate([
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
      let result = cursor.toArray();
      res.status(200).json({
        results: result,
      });
      await cursor.close();
      // await disconnect();
    } catch (e) {
      res.status(400).json("something went wrong!");
      console.log(e);
    }
  } else {
    // Handle any other HTTP method
    res.status(400).json({ message: "Invalid Parameters" });
  }
}
