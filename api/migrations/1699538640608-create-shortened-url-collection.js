const mongodb = require('mongodb')
const dotenv = require('dotenv')
const MongoClient = mongodb.MongoClient

dotenv.config();

const mongoURI = process.env.MONGODB_URI;
const mongoClient = new MongoClient(mongoURI);

module.exports.up = async function (next) {
  const database = mongoClient.db("urlDb");
  (await database.createCollection("urls")).createIndex({ shortenedUrl: 1 }, { unique: true });
  next()
}

module.exports.down = function (next) {
  const database = mongoClient.db("urlDb");
  database.collection("shortenedUrl").drop();
  next()
}
