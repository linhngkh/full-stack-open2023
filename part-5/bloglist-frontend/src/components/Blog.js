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
      <h2>blogs</h2>
      {blog.author} logged in <button onClick={logout}>logout</button>
      {blog.title}
    </div>
  );
};

export default Blog;
