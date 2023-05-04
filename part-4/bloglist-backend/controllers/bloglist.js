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

blogRoute.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(200).json(blog);
  } else {
    res.status(404).end()
  }
});

blogRoute.delete("/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id).then((deletedBlog) =>
    res.status(204).end()
  );
});

module.exports = blogRoute;
