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

const blogRoute = require("./controllers/bloglist");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info(`Connected to Mongodb`.bgYellow);
  })
  .catch((error) => logger.error("Error connecting to mongodb", error.message));

mongoose.set("strictPopulate", false);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRoute);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);
app.use(middleware.tokenExtractor);
module.exports = app;
