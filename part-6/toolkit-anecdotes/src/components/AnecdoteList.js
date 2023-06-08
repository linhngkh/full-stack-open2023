import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notifyReducer";
import { initializeAnecdotes, updateOne } from "../reducers/anecdoteReducer";
import { useEffect } from "react";

const AnecdoteList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter)
        )
      : state.anecdotes
  );
  // Sort quotes array on component render or whenever it changes
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes);

  const vote = (anecdote) => {
    dispatch(updateOne(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 10));
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote, index) => (
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
