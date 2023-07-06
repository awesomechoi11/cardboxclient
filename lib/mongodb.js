const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;

// check the MongoDB URI
if (!MONGODB_URI) {
  throw new Error("Define the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
  throw new Error("Define the MONGODB_DB environmental variable");
}

let client;
let db;

async function connectToAtlas() {
  // set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxIdleTimeMS: 10000,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 20000,
  };

  // Connect to cluster
  client = new MongoClient(MONGODB_URI, opts);
  await client.connect();
  db = client.db(MONGODB_DB);

  return {
    client: client,
    db: db,
    disconnect: () => client.close(),
  };
}

module.exports = {
  connectToAtlas,
  client,
  db,
};
