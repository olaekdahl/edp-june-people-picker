import express from 'express';
import { promises as fs } from 'fs';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const collectionName = process.env.MONGO_DB_COLLECTION;

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const port = 3001;


app.get('/hello', (req, res) => res.send(`Server is working`));

app.get('/api/people/', async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const people = await collection.find({}).toArray();
    res.json(people);
} catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
}
});

app.get('/api/people/:id', async (req, res) => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  const { id } = req.params;
  console.log("id:"+id);
  const person = await collection.findOne({ _id: new ObjectId(id) });
  if (person) {
    res.json(person);
  } else {
    res.status(404).send(`Person with id ${id} could not be found.`)
  }
});


app.delete('/api/people/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 1) {
        res.status(200).send('Person deleted successfully');
    } else {
        res.status(404).send('Person not found');
    }
} catch (err) {
    console.error('Error:', err);
    res.status(500).send('Hmm, something doesn\'t smell right... Error deleting person');
}
});

// Other static assets like images 
app.use("/assets/images", express.static("./assets/images"));
// The vanilla JS client - Now using the React app instead
// app.use(express.static("../client"));
// The *COMPILED* version of the React client app
app.use(express.static("../react-client/dist"));
app.use("/people", express.static("../react-client/dist/index.html"));

app.listen(port);

console.log(`listening on port ${port}`);
