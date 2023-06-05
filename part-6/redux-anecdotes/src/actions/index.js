// action creators
export const voteIncrement = (id) => {
  return {
    type: "INCREMENT_VOTE_COUNT",
    data: { id },
  };
};
