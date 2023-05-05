import React from "react";

const ProgramExerciseList = ({ exercises }) => {

  const renderedExercises = exercises.map(exercise => {
    let content;

    if (exercise.status === 'approved') {
      const { name, sets, reps, weight, unit } = exercise;
      content = `${name} - ${sets} sets X ${reps} reps at ${weight} ${unit}`; 
    }

    if (exercise.status === 'pending') {
      content = 'This exercise is awaiting moderation.';
    }

    if (exercise.status === 'rejected') {
      content = 'This exercise has been rejected.';
    }

    return (
      <li key={exercise.id}>{content}</li>
    );
  });

  return (
    <ul>{renderedExercises}</ul>
  );
};

export default ProgramExerciseList;
