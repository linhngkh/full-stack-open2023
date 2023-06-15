import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error("anecdote service not  due to problems in server");
  }
};

export const addNewAnecdote = (newAnecdote) =>
  axios.post(baseUrl, newAnecdote).then((response) => response.data);

export const updateAnecdote = (updateAnecdote) =>
  axios
    .put(`${baseUrl}/${updateAnecdote.id}`, updateAnecdote)
    .then((response) => response.data);
