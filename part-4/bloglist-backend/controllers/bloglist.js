const Blog = require("../model/bloglist");
const blogRoute = require("express").Router();
const User = require("./users");

blogRoute.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

blogRoute.post("/", async (req, res, next) => {
  try {
    const body = req.body;

    const user = await User.findById(body.userId);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog);
  } catch (error) {
    next(error);
  }
});

blogRoute.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(201).json(blog);
  } else {
    res.status(400).end();
  }
});

blogRoute.delete("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndRemove(req.params.id);
    if (blog) {
      res.status(204).end();
    }
  } catch (error) {
    next(error);
  }
});

blogRoute.put("/:id", async (req, res, next) => {
  try {
    const body = req.body;
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
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

module.exports = blogRoute;
