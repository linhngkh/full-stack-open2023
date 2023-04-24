import React, { useState } from "react";
import Statistics from "./Statistics";
import Button from "./Button";

const SecondPart = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  const total = good + neutral + bad;
  const average = (total / 3).toFixed(1);
  const positive = (good / total) * 100;
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button
        handleBadClick={handleBadClick}
        handleGoodClick={handleGoodClick}
        handleNeutralClick={handleNeutralClick}
      />
      <h1>Statistics</h1>
      {total === 0 ? (
        <h2>No feedback given</h2>
      ) : (
        <Statistics
          total={total}
          bad={bad}
          good={good}
          neutral={neutral}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

export default SecondPart;
