import React from "react";

const Blog = ({ blog, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser("");
  };

  return (
    <div>
      {blog.title} {blog.author} <button onClick={logout}>logout</button>
    </div>
  );
};

export default Blog;
