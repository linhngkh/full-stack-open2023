require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const config = require("./utils/config");
const blogRoute = require("./controllers/bloglist");
const bodyParser = require("body-parser");

logger.info("Connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info(`Connected to Mongodb`.bgYellow);
  })
  .catch((error) => logger.error("Error connecting to mongodb", error.message));

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use("/api/blogs", blogRoute);

module.exports = app;
