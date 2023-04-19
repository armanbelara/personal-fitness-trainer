const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const exercisesByProgramId = {};

app.get('/programs/:id/exercises', (req, res) => {
  res.send(exercisesByProgramId[req.params.id] || []);
});

app.post('/programs/:id/exercises', (req, res) => {
  const exerciseId = `prx_${randomBytes(4).toString('hex')}`;
  const { sets, reps, weight, unit, duration, rest_time, intensity } = req.body;

  const exercises = exercisesByProgramId[req.params.id] || [];

  exercises.push({ id: exerciseId, sets, reps, weight, unit, duration, rest_time, intensity });
  exercisesByProgramId[req.params.id] = exercises;

  res.status(201).send(exercises);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
