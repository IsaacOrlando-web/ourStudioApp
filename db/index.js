const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();


const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let db;

async function connectDB() {
    try {
        const conn = await client.connect();
        console.log('Connected to MongoDB');
        db = conn.db("ourStudio");
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
}

async function closeDB() {
    try {
        await client.close();
        console.log('MongoDB connection closed');
    }catch (error) {
        console.error('Error closing MongoDB connection:', error);
    }
}

module.exports = { connectDB, closeDB, db: connectDB() };