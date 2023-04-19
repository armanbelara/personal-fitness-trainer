import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ProgramExerciseCreate = ({ programId }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const { name, sets, reps, weight, unit } = data;

    await axios.post(`http://localhost:4001/programs/${programId}/exercises`, {
      name, sets, reps, weight, unit
    });

    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Name</label>
          <input className="form-control" {...register("name")} />
        </div>

        <div className="form-group">
          <label>Sets</label>
          <input type="number" className="form-control" {...register("sets")} />
        </div>
        
        <div className="form-group">
          <label>Reps</label>
          <input type="number" className="form-control" {...register("reps")} />
        </div>

        <div className="form-group">
          <label>Weight</label>
          <input type="number" className="form-control" {...register("weight")} />
        </div>
        
        <div className="mb-3 form-group">
          <label>Unit of Measurement</label>
          <select class="form-select" {...register("unit")}>
            <option>kg</option>
            <option>lbs</option>
          </select>
        </div>

        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default ProgramExerciseCreate;