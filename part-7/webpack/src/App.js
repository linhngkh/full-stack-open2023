import React, { useState } from "react";
import { useNotes } from "./hooks.";

const App = () => {
  const [counter, setCounter] = useState(0);

  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);
  const BACKEND_URL = "https://notes2023.fly.dev/api/notes";

  const handleClick = () => {
    setCounter(counter + 1);
    setValues(values.concat(counter));
  };

  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} notes on server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;
