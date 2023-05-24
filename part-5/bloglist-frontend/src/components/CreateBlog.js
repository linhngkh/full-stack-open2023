import React, { useState } from "react";
import BlogForm from "./BlogForm";
import PropTypes from "prop-types";

const CreateBlog = ({ handleAddBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

  const createBlog = (e) => {
    e.preventDefault();
    handleAddBlog(newBlog.title, newBlog.author, newBlog.url);
    setNewBlog({ title: "", author: "", url: "" });
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  return (
    <div>
      <BlogForm
        onInputChange={onInputChange}
        createBlog={createBlog}
        newBlog={newBlog}
      />
    </div>
  );
};

CreateBlog.PropTypes = {
  onInputChange: PropTypes.func.isRequired,
  createBlog: PropTypes.func.isRequired,
  newBlog: PropTypes.string.isRequired,
};

export default CreateBlog;
