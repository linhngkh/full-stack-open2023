import React, { useState } from "react";

const Blogs = ({ blog, updateLikes }) => {
  const [view, setView] = useState(false);

  const addLikes = (blog) => {
    updateLikes(blog.id, {
      user: blog.user,
      author: blog.author,
      likes: blog.likes,
      title: blog.title,
      url: blog.url,
    });
  };

  return (
    <div>
      <div className="pt-3 pl-2 border-solid border-slate-700 border-2 mb-5 flex gap-3 items-center">
        <p>{blog.title}</p>
        <span>
          <button
            onClick={() => setView(true)}
            className="px-2 py-0.5 bg-slate-400 rounded-lg text-white"
          >
            view
          </button>
        </span>
      </div>
      {view && (
        <div className="pt-3 pl-2 border-solid border-slate-700 border-2 mb-5 flex gap-3 items-center">
          <div>
            <div className="flex gap-2">
              <p>{blog.title}</p>
              <button
                onClick={() => setView(false)}
                className="px-2 py-0.5 bg-slate-400 rounded-lg text-white"
              >
                hide
              </button>
            </div>
            <p>{blog.url}</p>
            <div className="flex gap-2">
              <p>likes {blog.likes}</p>{" "}
              <span>
                <button
                  onClick={addLikes(blog)}
                  className="px-2 py-0.5 bg-slate-400 rounded-lg text-white"
                >
                  like
                </button>
              </span>
            </div>

            <p>{blog.author}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
