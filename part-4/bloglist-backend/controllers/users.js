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

userRouter.post("/", async (request, response, next) => {
  try {
    const { username, password, name } = request.body;

    if (!password || password.length < 3) {
      return response.status(400).send({
        error: "Pasword minimum length 3",
      });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    response.json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;
