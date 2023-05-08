const User = require("../model/users");
const userRouter = require("express").Router();
const bcrypt = require("bcrypt");

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 2,
    author: 2,
    url: 2,
  });
  res.json(users.map((u) => u.toJON()));
});

userRouter.post("/", async (req, res, next) => {
  try {
    const { username, name, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (!body.username || !body.password) {
      return res
        .status(400)
        .json({ error: "Useranme or password are missing" });
    } else if (body.username.length < 3 || body.password.length < 3) {
      return res.status(400).json({ error: "username or password too short" });
    } else {
      const user = new User({
        username,
        name,
        passwordHash,
      });
    }

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = userRouter;
