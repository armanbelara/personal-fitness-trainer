import React from "react";

const ProgramExerciseList = ({ exercises }) => {

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
