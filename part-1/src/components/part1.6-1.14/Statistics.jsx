import React from "react";
import StatisticLine from "./statistics/StatisticLine";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <div>
      {" "}
      <StatisticLine
        good={good}
        bad={bad}
        neutral={neutral}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default Statistics;
