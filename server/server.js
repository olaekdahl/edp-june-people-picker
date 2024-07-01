// const fs = require('fs');
// const express = require('express');
import fs from 'fs';
import express from 'express';
const app = express();
const port = 3001;

const db = {}
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


app.delete('/api/people/:id', (req, res) => {
  // Pretend to do the delete
  res.send(200, "Delete was successful")
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
