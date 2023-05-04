const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const exercisesByProgramId = {};

app.get('/programs/:id/exercises', (req, res) => {
  res.send(exercisesByProgramId[req.params.id] || []);
});

app.post('/programs/:id/exercises', async (req, res) => {
  const exerciseId = `prx_${randomBytes(4).toString('hex')}`;
  const { name, sets, reps, weight, unit } = req.body;

  const exercises = exercisesByProgramId[req.params.id] || [];

  exercises.push({ id: exerciseId, name, sets, reps, weight, unit, status: 'pending' });
  exercisesByProgramId[req.params.id] = exercises;

  await axios.post('http://localhost:4005/events',{
    type: 'ProgramExerciseCreated',
    data: {
      id: exerciseId,
      programId: req.params.id,
      name, sets, reps, weight, unit,
      status: 'pending'
    }
  });

  res.status(201).send(exercises);
});

app.post('/events', async (req, res) => {
  console.log("Event Received:", req.body.type);

  const { type, data } = req.body;

  if (type === 'ProgramExerciseModerated') {
    const { programId, id, name, sets, reps, weight, unit, status } = data;

    const exercises = exercisesByProgramId[programId];

    const exercise = exercises.find(exercise => {
      return exercise.id === id;
    });

    exercise.status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'ProgramExerciseUpdated',
      data: {
        programId, id, name, sets, reps, weight, unit, status
      }
    })
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
