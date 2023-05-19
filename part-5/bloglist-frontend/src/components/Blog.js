import React from "react";

const Blogs = ({ blog }) => {
  return (
    <div>
      {blog.title} - {blog.author}
    </div>
  );
};

export default Blogs;
