const Blog = require("../model/bloglist");
const blogRoute = require("express").Router();

blogRoute.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogRoute.post("/", (req, res) => {
  const blog = new Blog(req.body);
  blog.save().then((result) => {
    res.status(201).json(result);
  });
});

module.exports = blogRoute;
