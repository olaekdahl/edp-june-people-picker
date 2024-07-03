import express from 'express';
import cors from 'cors';
import { deletePerson, getAllPeople, getPerson, serverEnd } from './peopleRepository.js';

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
const port = process.env.PORT;

app.get('/api/people/', async (req, res) => {
  try {
    const people = await getAllPeople();
    res.json(people);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No people for you! ☹");
  }
});

app.get('/api/people/:id', async (req, res) => {
  const { id } = req.params;
  const person = await getPerson(+id)
  if (person) {
    res.json(person);
  } else {
    res.status(404).send(`Person with id ${id} could not be found.`)
  }
});


app.delete('/api/people/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPerson = await deletePerson(+id)
    if (deletedPerson) {
      res.status(200).send(deletedPerson);
    } else {
      res.status(404).send(`Person ${id} not found`);
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

process.on('SIGINT', () => {
  console.log('Shutting down gracefully')
  serverEnd();
  process.exit(0);
})