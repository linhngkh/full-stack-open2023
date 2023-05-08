const User = require("../model/users");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 2,
    author: 2,
    url: 2,
  });
  res.json(users.map((u) => u.toJSON()));
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "username or password are missing" });
    } else if (username.length < 3 || password.length < 3) {
      return res.status(400).json({ error: "username or password too short" });
    } else {
      const user = new User({
        username: username,
        name: name,
        passwordHash,
      });
    }

    const users = await User.find({});
    const uniqueUsername = users.filter((u) => u.username === user.username);

    if (uniqueUsername.length === 0) {
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } else {
      res.status(400).json({ error: "username needed to be unique" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
