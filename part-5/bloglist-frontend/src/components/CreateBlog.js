import React, { useState } from "react";

const CreateBlog = ({ handleAddBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const createBlog = (e) => {
    e.preventDefault();
    handleAddBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };
  return <div>CreateBlog</div>;
};

export default CreateBlog;
