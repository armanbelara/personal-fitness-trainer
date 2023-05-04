const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const programs = {};

app.get('/programs', (req, res) => {
  res.send(programs);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

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

  console.log(programs);

  res.send({});
});

app.listen(4002, () => {
  console.log("Listening on 4002");
});
