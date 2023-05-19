import React from "react";

const BlogForm = ({
  title,
  author,
  url,
  handleSubmit,
  setTitle,
  setAuthor,
  setUrl,
  resetForm,
}) => {
  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <input
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">save</button>
        <button type="button" onClick={resetForm}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
