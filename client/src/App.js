import React from "react";
import ProgramCreate from "./program/ProgramCreate";
import ProgramList from "./program/ProgramList";

const App = () => {
  return (
    <div className="container">
      <h1>Create Program</h1>
      <ProgramCreate />
      <hr />
      <ProgramList />
    </div>
  );
};

export default App;
