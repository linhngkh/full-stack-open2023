const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const notesRouter = require("./controllers/note");
const usersRouter = require("./controllers/user");
const mongoose = require("mongoose");
const config = require("./utils/config");

mongoose.set("strictPopulate", false);

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, { useNewUrlParser: "true" })
  .then(() => {
    logger.info("Connected to Mongodb");
  })
  .catch((error) => {
    logger.error("Error connecting to mongodb", error.message);
  });

// middleware
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use("/api/users", usersRouter);

app.use(middleware.unknownEndpoint);
// handler of requests with result to errors
app.use(middleware.errorHandler);

module.exports = app;
