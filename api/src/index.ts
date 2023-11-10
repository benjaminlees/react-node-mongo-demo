import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'

dotenv.config()

const app: Express = express()
const port = process.env.PORT
const mongoURI = process.env.MONGODB_URI as string

const mongoClient = new MongoClient(mongoURI)
const database = mongoClient.db('urlDb')
app.use(cors())
app.use(express.json())
app.post('/shorten-url', async (req: Request, res: Response) => {
  const url = req.body.url
  if (url === undefined) {
    return res.status(400).send('Error: url is required')
  }
  // Connect to the MongoDB cluster
  const urls = database.collection('urls')
  const randomEightCharString = Math.random().toString(36).slice(5)

  // Create a document to insert
  const doc = {
    originalUrl: url,
    shortenedUrl: `https://pbid.io/${randomEightCharString}`
  }

  // Insert the defined document into the "shortenedUrl" collection and return updated document
  const result = await urls.findOneAndUpdate(
    { _id: new ObjectId() },
    { $setOnInsert: doc },
    { upsert: true, returnDocument: 'after' }
  )
  res.send(result)
})

app.delete('/shorten-url/:id', async (req: Request, res: Response) => {
  const id = req.params.id

  // Connect to the MongoDB cluster
  const urls = database.collection('urls')

  // Insert the defined document into the "shortenedUrl" collection
  const result = await urls.deleteOne({ _id: new ObjectId(id) })
  res.send(result)
})

app.get('/shortened-urls', async (req: Request, res: Response) => {
  const database = mongoClient.db('urlDb')
  const urls = database.collection('urls')
  const shortenedUrls = await urls.find().toArray()
  res.send(shortenedUrls)
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
