import React, { useState } from "react";

const Blogs = ({ blog, updateLikes, deleteBlog }) => {
  const [view, setView] = useState(false);

  const addOne = (blog) => {
    updateLikes(blog.id, {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
  };

  const deleteOneBlog = (blog) => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    );
    if (confirm) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div className="blog-container">
      <div className="pt-3 pl-2 border-solid border-slate-700 border-2 mb-5 flex gap-3 items-center">
        <p className="title"> {blog.title}</p>
        <p className="author">{blog.author}</p>
        <span>
          {!view && (
            <button
              onClick={() => setView(true)}
              className="px-2 py-0.5 bg-slate-400 rounded-lg text-white"
            >
              view
            </button>
          )}
        </span>
      </div>

      {view && (
        <div className="pt-3 pl-2 border-solid border-slate-700 border-2 mb-5 flex gap-3 items-center">
          <div>
            <div className="flex gap-2">
              <button
                onClick={() => setView(false)}
                className="px-2 py-0.5 bg-slate-400 rounded-lg text-white"
              >
                hide
              </button>
            </div>
            <p className="url">{blog.url}</p>
            <div className="flex gap-2">
              <p className="likes">likes {blog.likes ? blog.likes : "0"}</p>{" "}
              <span>
                <button
                  onClick={() => addOne(blog)}
                  className="px-2 py-0.5 bg-slate-400 rounded-lg text-white"
                >
                  like
                </button>
              </span>
            </div>

            <p className="author">{blog.author}</p>
          </div>
          <div className="">
            <button
              onClick={() => deleteOneBlog(blog)}
              className="px-2 py-0.5 bg-blue-400 rounded-lg text-white "
            >
              remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
