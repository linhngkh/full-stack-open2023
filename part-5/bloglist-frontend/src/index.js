import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Blogs from "./components/Blogs";
// import Blog from "./components/Blog";
import "./styles.css";
import LoginForm from "./components/LoginForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/blogs" element={<Blogs />} />

      {/* <Route path="/blogs/:id" element={<Blog />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);
