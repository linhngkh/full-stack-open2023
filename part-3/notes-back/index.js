const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const Note = require("./models/note");
const errorHandler = require("./utils/middleware");
const logger = require("./utils/logger");

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
// middleware
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  Note.findById(id)
    .then((note) => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/notes", (req, res, next) => {
  const body = req.body;

  if (body.content === undefined) {
    return res.status(400).json({
      error: "content missing",
    });
  }
  // a new note object created with the Note constructor function.
  const note = new Note({
    content: body.content,
    important: body.important || false,
  });

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((error) => next(error));
});

app.delete("/api/notes/:id", (req, res, next) => {
  const id = Number(req.params.id);
  Note.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/notes/:id", (req, res, next) => {
  const { content, important } = req.body;
  const id = req.params.id;

  Note.findByIdAndUpdate(
    id,
    { content, important },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedOne) => {
      res.json(updatedOne);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);
// handler of requests with result to errors
app.use(errorHandler);

app.listen(config.PORT, () =>
  logger.info(`Server running on port ${config.PORT}`)
);
