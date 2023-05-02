const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("Connected to Mongodb");
  })
  .catch((error) => logger.error("Error connecting to mongodb", error.message));

app.use(cors());
app.use(express.json());

module.exports = app;
