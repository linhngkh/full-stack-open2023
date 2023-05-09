const Blog = require("../model/bloglist");
const blogRoute = require("express").Router();
const User = require("./users");
const jwt = require("jsonwebtoken");
const helper = require("../utils/middleware");
// Bearer eyJhbGciOiJIUzI1NiIsInR5c2VybmFtZSI6Im1sdXVra2FpIiwiaW

const getTokenFrom = (req) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogRoute.get("/", async (req, res, next) => {
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

blogRoute.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.status(201).json(blog);
  } else {
    res.status(400).end();
  }
});

blogRoute.post("/", helper.tokenExtractor, async (req, res, next) => {
  try {
    const body = req.body;

    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    res.status(201).json(savedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

blogRoute.delete("/:id", async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET);

    if (!decodedToken.id) {
      return response.status(401).json({ error: "Invalid or missing token" });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog.user.toString() === decodedToken.id) {
      return response
        .status(403)
        .json({ error: "You are not authorized to delete this blog" });
    }

    await Blog.findByIdAndRemove(req.params.id);

    res.status(204).end();
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

module.exports = blogRoute;
