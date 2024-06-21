const express = require('express');
const app = express();
const port = 3001;

app.get('/hello', (req, res) => res.send(`Server is working`));

app.listen(port);
