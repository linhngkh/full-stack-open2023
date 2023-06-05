// action creators
export const voteIncrement = (id) => {
  return {
    type: "INCREMENT_VOTE_COUNT",
    data: { id },
  };
};

export const addNew = (content) => {
  return {
    type: "ADD_NEW_ONE",
    data: content,
  };
};
