import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filterAnecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter) {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter)
      );
    } else {
      return anecdotes;
    }
  });

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };
  return (
    <>
      {filterAnecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote, index) => (
          <div key={index}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};

export default AnecdoteList;
