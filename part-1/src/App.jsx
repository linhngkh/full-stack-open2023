import React from "react";
import FirstPart from "./components/parts1.1-1.11/FirstPart";
import SecondPart from "./components/part1.6-1.14/SecondPart";
import Anecdotes from "./components/anecdotes/Anecdotes";
const App = () => {
  return (
    <div>
      <div>
        <h1>Part 1.1 -1.5 </h1> <FirstPart />
      </div>
      <div>
        <h1>Part1.6-1.11 Unicafe</h1>
        <SecondPart />
      </div>
      <div>
        <h1>Part 1.12 - 1.14</h1>
        <Anecdotes />
      </div>
    </div>
  );
};

export default App;
