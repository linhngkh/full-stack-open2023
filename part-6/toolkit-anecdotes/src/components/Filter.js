import { useDispatch } from "react-redux";
import { filterAnecdote } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(filterAnecdote(event.target.value.toLowerCase()));
  };
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      {" "}
      filter
      <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
