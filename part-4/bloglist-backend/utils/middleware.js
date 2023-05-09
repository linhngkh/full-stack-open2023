const logger = require("./logger");

const requestLogger = (req, res, next) => {
  console.log("Method:", req.method);
  console.log("Path:  ", req.path);
  console.log("Body:  ", req.body);
  console.log("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const tokenExtractor = (req, res, next) => {
  // code that extracts the token
  const token = req.headers.authorization;
  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  // Attach the extracted token to the request object for future use
  request.token = token;
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: "Invalid Token" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expired",
    });
  }
  logger.error(error.message);
  next(error);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  requestLogger,
  tokenExtractor,
};
