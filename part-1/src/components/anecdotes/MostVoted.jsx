import React from "react";

const MostVoted = ({ anecdotes, votes }) => {
  const mostVoteNumber = Math.max(...votes);
  const mostVoteQuote = Object.keys(
    votes.filter((vote) => votes[vote] === mostVoteNumber)
  );

  return (
    <div>
      {mostVoteQuote.length > 1 && mostVoteNumber > 0 ? (
        <p>There are more than 1 anecdote having more votes </p>
      ) : (
        <p>{anecdotes[mostVoteQuote]}</p>
      )}
      <br />
      {mostVoteNumber > 0 && <p>has {mostVoteNumber}</p>}
    </div>
  );
};

export default MostVoted;
