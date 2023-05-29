require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
require("express-async-errors");
const logger = require("./utils/logger");
const config = require("./utils/config");
const bodyParser = require("body-parser");
const middleware = require("./utils/middleware");

const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    logger.info(`Connected to Mongodb`.bgYellow);
  })
  .catch((error) => logger.error("Error connecting to mongodb", error.message));

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(middleware.requestLogger);
app.use(express.urlencoded({ extended: true }));

app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
