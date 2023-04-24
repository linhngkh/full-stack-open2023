import React from "react";

const ButtonGroup = ({
  handleBadClick,
  handleGoodClick,
  handleNeutralClick,
}) => {
  return (
    <div>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
    </div>
  );
};

export default ButtonGroup;
