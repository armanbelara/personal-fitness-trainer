import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgramExerciseCreate from '../programExercise/ProgramExerciseCreate';
import ProgramExerciseList from '../programExercise/ProgramExerciseList';

const ProgramList = () => {
  const [programs, setPrograms] = useState({});

  const fetchPrograms = async () => {
    const res = await axios.get('http://localhost:4002/programs');

    setPrograms(res.data);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const renderedPrograms = Object.values(programs).map(program => {
    return (
      <div
        key={program.id}
        className="card"
        style={{ width: '30%', marginBottom: '20px' }}
      >
        <div className="card-body">
          <h3>{program.name}</h3>
          <p>{program.notes}</p>
          <ProgramExerciseList exercises={program.exercises} />
          <ProgramExerciseCreate programId={program.id} />
        </div>
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPrograms}
    </div>
  );
};

export default ProgramList;