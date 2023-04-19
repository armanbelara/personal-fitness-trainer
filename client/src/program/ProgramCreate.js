import React, { useState } from "react";
import axios from "axios";

const ProgramCreate = () => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:4000/programs', {
      name, notes
    });

    setName('');
    setNotes('');
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-3 form-group">
          <label>Name</label>
          <input
            className="form-control"
            onChange={e => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="mb-3 form-group">
          <label>Notes</label>
          <textarea
            className="form-control"
            onChange={e => setNotes(e.target.value)}
            value={notes}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default ProgramCreate;