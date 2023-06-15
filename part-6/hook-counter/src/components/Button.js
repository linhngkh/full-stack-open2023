import { useCounterDispatch } from "../CounterContext";

export default function Button({ type, label }) {
  const dispatch = useCounterDispatch();
  return <button onClick={() => dispatch({ type })}>{label}</button>;
}
