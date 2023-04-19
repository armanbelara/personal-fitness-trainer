import React, { useState, useEffect } from "react";
import axios from "axios";

const ProgramExerciseList = ({ programId }) => {
  const [exercises, setExercises] = useState([]);

  const fetchExercises = async () => {
    const res = await axios.get(`http://localhost:4001/programs/${programId}/exercises`);

    setExercises(res.data);
  };
  
  useEffect(() => {
    fetchExercises();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderedExercises = exercises.map(exercise => {
    return (
      <li key={exercise.id}>
        {exercise.name} - {exercise.sets} sets X {exercise.reps} reps at {exercise.weight} {exercise.unit} 
      </li>
    );
  });

  return (
    <ul>{renderedExercises}</ul>
  );
};

export default ProgramExerciseList;
