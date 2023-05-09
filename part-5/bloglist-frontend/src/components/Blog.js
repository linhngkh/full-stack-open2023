import React from "react";

const Blog = ({ blog }) => {
  const logout = () => {
    window.localStorage.removeItem("loggedBlogUser");
  };

  return (
    <div>
      {blog.title} {blog.author} <button onClick={logout}>logout</button>
    </div>
  );
};

export default Blog;
