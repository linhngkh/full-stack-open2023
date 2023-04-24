import React from "react";
import FirstPart from "./components/parts1.1-1.5/FirstPart";
import SecondPart from "./components/part1.6-1.14/SecondPart";
const App = () => {
  return (
    <div>
      <div>
        <h1>Part 1.1 -1.5</h1> <FirstPart />
      </div>
      <div>
        <h1>Part1.6-1.14</h1>
        <SecondPart />
      </div>
    </div>
  );
};

export default App;
