import React from "react";
import Button from "./utils/Button";
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
  const inputStyles = `w-full bg-slate-200 mb-3 rounded-lg px-3 py-2`;

  return (
    <div className="pt-5 px-3">
      <h1 className="font-bold text-xl">Create a new blog</h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-1/3 gap-1">
        <input
          name="title"
          value={title}
          placeholder="title"
          className={inputStyles}
          onChange={({ target }) => setTitle(target.value)}
        />

        <input
          name="author"
          value={author}
          placeholder="author"
          className={inputStyles}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <input
          name="url"
          value={url}
          placeholder="url"
          className={inputStyles}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" className="space-y-5 ">
          save
        </Button>
        <Button type="button" onClick={resetForm}>
          Reset
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
