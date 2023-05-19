import React from "react";
import Button from "./utils/Button";

const BlogForm = ({ onInputChange, createBlog, newBlog }) => {
  const inputStyles = `w-full bg-slate-200 mb-3 rounded-lg px-3 py-2`;

  return (
    <div className="pt-5 px-3">
      <h1 className="font-bold text-xl">Create a new blog</h1>

      <form onSubmit={createBlog} className="flex flex-col w-1/3 gap-1">
        <input
          type="title"
          name="title"
          value={newBlog.title}
          placeholder="title"
          className={inputStyles}
          onChange={onInputChange}
        />

        <input
          type="author"
          name="author"
          value={newBlog.author}
          placeholder="author"
          className={inputStyles}
          onChange={onInputChange}
        />

        <input
          type="url"
          name="url"
          value={newBlog.url}
          placeholder="url"
          className={inputStyles}
          onChange={onInputChange}
        />
        <Button type="submit" className="space-y-5 ">
          create
        </Button>
      </form>
    </div>
  );
};

export default BlogForm;
