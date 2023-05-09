const User = require("../model/users");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });
  res.json(users.map((u) => u.toJSON()));
});

userRouter.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    if (!body.username || !body.password) {
      return res.status(400);
      // .json({ error: "`username` and/or `password` are missing" });
    } else if (body.username.length < 3 || body.password.length < 3) {
      return res
        .status(400)
        .json({ error: "username and/or password too short" });
    } else {
      const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      });

      const users = await User.find({});
      const uniqueUsername = users.filter((u) => u.username === user.username);

      if (!uniqueUsername.length === 0) {
        const savedUser = await user.save();
        res.json(savedUser);
      } else {
        res.status(400).json({ error: "`username` to be unique" });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
