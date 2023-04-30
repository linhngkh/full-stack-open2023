const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malfortmatted id" });
  }
  next(error);
};

module.exports = errorHandler;