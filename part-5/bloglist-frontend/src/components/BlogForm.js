import React from "react";

const BlogForm = ({
  author,
  title,
  url,
  setAuthor,
  setTitle,
  setUrl,
  createBlog,
}) => {
  return (
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
  );
};

export default BlogForm;
