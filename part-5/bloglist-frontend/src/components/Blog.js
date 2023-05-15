import React from "react";

const Blog = ({
  blog,
  setUser,

  setNotification,
}) => {
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setNotification("Logged out successfully!");
    setUser("");
  };

  return (
    <div>
      {blog.title} {blog.author} logged in{" "}
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Blog;
