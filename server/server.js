const fs = require('fs');
const express = require('express');
const app = express();
const port = 3001;

db = {}
db.people = JSON.parse(fs.readFileSync('../data/students.json'));

app.get('/hello', (req, res) => res.send(`Server is working`));


app.get('/api/people/', (req, res) => {
  res.send(db.people);
});
app.get('/api/people/:id', (req, res) => {
  const id = +req.params.id;
  const person = db.people.find(p => p.id === id);
  if (person) {
    res.send(person);
  } else {
    res.status(404).send(`Person with id ${id} could not be found.`)
  }
});

app.listen(port);

console.log(`listening on port ${port}`);
