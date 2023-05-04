const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'ProgramExerciseCreated') {

    const { id, programId, name, sets, reps, weight, unit } = data;
    const status = name.includes('sex') ? 'rejected' : 'approved';

    await axios.post('http://localhost:4005/events', {
      type: 'ProgramExerciseModerated',
      data: {
        id, programId,
        name, sets, reps, weight, unit,
        status
      }
    })
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
