import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

const mongoClient = new MongoClient(mongoURI);
app.use(express.json())
app.post('/shorten-url', async (req: Request, res: Response) => {
  const url = req.body.url;
  console.log('body>>', req.body)


  // Connect to the MongoDB cluster
  const database = mongoClient.db("urlDb");
  const urls = database.collection("urls");
  const randomEightCharString = Math.random().toString(36).slice(5);
  
  // Create a document to insert 
  const doc = {
    originalUrl: url,
    shortenedUrl: `https://pbid.io/${randomEightCharString}`
  }
  // Insert the defined document into the "shortenedUrl" collection
  const result = await urls.insertOne(doc);
  res.send(result);
});

app.delete('/shorten-url', async (req: Request, res: Response) => {
  const url = req.body.url;


  // Connect to the MongoDB cluster
  const database = mongoClient.db("urlDb");
  const urls = database.collection("urls");

  // Insert the defined document into the "shortenedUrl" collection
  const result = await urls.deleteMany({originalUrl: url})
  res.send(result);
});

app.get('/shortened-urls', async (req: Request, res: Response) => {
  const database = mongoClient.db("urlDb");
  const urls = database.collection("urls");
  const shortenedUrls = await urls.find().toArray();
  res.send(shortenedUrls);
});
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 