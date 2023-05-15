const Blog = require("../model/blogs");
const User = require("../model/users");
const jwt = require("jsonwebtoken");
const blogRouter = require("express").Router();
require("dotenv").config();
// Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW

blogRouter.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
    });
    res.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogRouter.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(201).json(blog);
  } else {
    res.status(400).end();
  }
});

blogRouter.post("/", async (req, res) => {
  const blog = new Blog(req.body);
  if (!req.token) {
    return res.status(401).json({ error: "Token is missing or invalid" });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  blog.user = user.id;

  if (!blog.url || !blog.title) {
    return res.status(400).json({ error: "Title or url missing" }).end();
  }

  if (!blog.likes) {
    blog.likes = 0;
  }

  const result = await blog.save();
  user.blogs = user.blogs.concat(blog);
  await user.save();

  res.status(201).json(result);
});

blogRouter.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true,
    });
    if (updatedBlog) {
      updatedBlog.save().then((result) => {
        res.status(200).json(result);
      });
    }
  } catch (error) {
    next(error);
  }
});

blogRouter.delete("/:id", async (req, res) => {
  if (!req.token) {
    return res.status(401).json({ error: "Token is missing" });
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
 
  if (!decodedToken.id) {
    return res.status(401).json({ error: "Token missing or invalid" });
  }

  const blog = await Blog.findById(req.params.id);

  if (!blog.user.toString() === decodedToken.id) {
    return res
      .status(404)
      .json({ error: "You are not authorized to delete this blog" });
  } else {
    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  }
});
module.exports = blogRouter;
