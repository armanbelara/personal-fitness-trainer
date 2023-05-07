const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const programs = {};

const handleEvent = (type, data) => {
  if (type === "ProgramCreated") {
    const { id, name, notes } = data;

    programs[id] = { id, name, notes, exercises: [] };
  }

  if (type === "ProgramExerciseCreated") {
    const { id, programId, name, sets, reps, weight, unit, status } = data;

    const program = programs[programId];
    program.exercises.push({ id, name, sets, reps, weight, unit, status });
  }

  if (type === "ProgramExerciseUpdated") {
    const { id, programId, name, sets, reps, weight, unit, status } = data;

    const program = programs[programId];
    const exercise = program.exercises.find(exercise => {
      return exercise.id === id;
    });

    exercise.name = name;
    exercise.sets = sets;
    exercise.reps = reps;
    exercise.unit = unit;
    exercise.weight = weight;
    exercise.status = status;
  }
};

app.get('/programs', (req, res) => {
  res.send(programs);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on 4002");

  const res = await axios.get('http://localhost:4005/events')
    .catch((err) => {
      console.log(err.message);
    });

  for (let event of res.data) {
    console.log('Processing event: ', event.type);

    handleEvent(event.type, event.data);
  }
});
