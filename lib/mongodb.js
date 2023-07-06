const { MongoClient } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.DB_NAME;
const NODE_ENV = process.env.NODE_ENV;

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
}

// check env
if (!NODE_ENV) {
    throw new Error("Define the NODE_ENV environmental variable");
}

async function connectToAtlas() {
    let client;
    const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxIdleTimeMS: 10000,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 20000,
    };
    if (NODE_ENV !== "production") {
        if (!global.mongoClient) {
            global.mongoClient = new MongoClient(MONGODB_URI, opts);
        }
        client = global.mongoClient;
    } else {
        client = new MongoClient(MONGODB_URI, opts);
    }
    await client.connect();
    const db = client.db(MONGODB_DB);

    return {
        client,
        db,
        disconnect: async () => {
            if (client) {
                await client.close();
            }
        },
    };
}

module.exports = {
    connectToAtlas,
};
