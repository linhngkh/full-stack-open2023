import React from "react";

const Blog = ({
  blog,
  setUser,
  author,
  title,
  url,
  setAuthor,
  setTitle,
  setUrl,
  createBlog,
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
      <div>
        <h1>create new</h1>
        <form onSubmit={createBlog}>
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
          <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
          <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
          <button>create</button>
        </form>
      </div>
    </div>
  );
};

export default Blog;
