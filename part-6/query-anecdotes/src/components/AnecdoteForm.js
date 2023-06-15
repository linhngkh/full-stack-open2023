import { addNewAnecdote } from "../api/request";
import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotifyContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(addNewAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });

  const onCreate = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    console.log("new anecdote");
    newAnecdoteMutation.mutate(
      { content },
      {
        onSuccess: () => {
          dispatch({ type: "CREATE_ANECDOTE", payload: content });
          setTimeout(() => {
            dispatch({ type: "DISAPPEAR_NOTIFY" });
          }, 5000);
        },
        onError: (error) => {
          if (content.length < 5) {
            dispatch({
              type: "ERROR",
              payload: `too short anecdote, must have length 5 or more`,
            });
            setTimeout(() => {
              dispatch({ type: "DISAPPEAR_NOTIFY" });
            }, 5000);
          } else {
            dispatch({
              type: "ERROR",
              payload: `${error}`,
            });
            setTimeout(() => {
              dispatch({ type: "DISAPPEAR_NOTIFY" });
            }, 5000);
          }
        },
      }
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
