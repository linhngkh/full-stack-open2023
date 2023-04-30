require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

// define a custom token that logs the request body
morgan.token("post", (req, res) => {
  return JSON.stringify(req.body);
});

// use morgan middleware with the 'combined' format
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length] :post")
);

// middleware
app.use(express.json());
app.use(cors());

app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("hello");
  if (res.headersSent !== true) {
    res.send("Hello World!");
  }
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

app.get("/info", (req, res) => {
  let d = Date(Date.now());
  let a = d.toString();
  res.send(
    `<div><p>Phonebook has info for ${Person.length} people</p><p>${a}</p></div>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Person.findById(id)
    .then((person) => {
      person ? res.json(person.toJSON()) : res.status(404).end();
    })
    .catch((error) => console.error("There are some error here", error));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: "Content missing" });
  }
  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      res.json(savedPerson.toJSON());
    })
    .catch((error) => error.message);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Person.findByIdAndDelete(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => error.message);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON());
    })
    .catch((error) => error.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
