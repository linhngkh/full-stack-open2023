import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

axios.get("https://sparkling-pine-4853.fly.dev/api/notes").then((res) => {
  const notes = res.data;
  ReactDOM.createRoot(document.getElementById("root")).render(
    <App notes={notes} />
  );
});
