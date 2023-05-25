import React from "react";
import Button from "./utils/Button";
import PropTypes from "prop-types";

const BlogForm = ({
  addBlog,
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
}) => {
  return (
    <div className="pt-5 px-3">
      <h1 className="font-bold text-xl">Create a new blog</h1>

      <form onSubmit={addBlog} className="flex flex-col w-1/3 gap-1">
        <input
          placeholder="write note content here"
          id="title"
          type="title"
          name="title"
          value={title}
          className="w-full bg-slate-200 mb-3 rounded-lg px-3 py-2"
          onChange={({ target }) => setTitle(target.value)}
        />

        <input
          placeholder="write note content here"
          id="author"
          type="author"
          name="author"
          value={author}
          className="w-full bg-slate-200 mb-3 rounded-lg px-3 py-2"
          onChange={({ target }) => setAuthor(target.value)}
        />

        <input
          placeholder="write note content here"
          id="url"
          type="url"
          name="url"
          value={url}
          className="w-full bg-slate-200 mb-3 rounded-lg px-3 py-2"
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button type="submit" className="space-y-5 ">
          create
        </Button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  setTitle: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  setAuthor: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  setUrl: PropTypes.func.isRequired,
};

export default BlogForm;
