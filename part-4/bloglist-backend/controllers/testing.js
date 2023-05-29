const testingRouter = require("express").Router();
const Blog = require("../model/blogs");
const User = require("../model/users");

testingRouter.post("/reset", async (req, res) => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  res.status(204).end();
});

module.exports = testingRouter;
