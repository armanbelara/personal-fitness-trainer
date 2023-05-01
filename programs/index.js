const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const programs = {};

app.get('/programs', (req, res) => {
  res.send(programs);
});

app.post('/programs', async (req, res) => {
  const id = `prg_${randomBytes(4).toString('hex')}`;
  const { name, notes } = req.body;

  programs[id] = {
    id, name, notes
  };

  await axios.post('http://localhost:4005/events', {
    type: "ProgramCreated",
    data: {
      id, name, notes
    }
  });

  res.status(201).send(programs[id]);
});

app.post('/events', (req, res) => {
  console.log("Received Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
