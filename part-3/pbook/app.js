require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT;
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const person = require("./models/person");
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

app.get("/info", (req, res) => {
  let d = Date(Date.now());
  let a = d.toString();
  res.send(`<div><p>Phonebook has info for 2 people</p><p>${a}</p></div>`);
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((response) => {
    console.log(response.data);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    return res.json(person);
  } else {
    return res.status(404).json({
      error: "The person with that id is not found.",
    });
  }
});

const generatedId = () => {
  const uniqueId = Math.floor(Math.random() * 100);
  return uniqueId;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    //   400 Bad Request
    return res.status(400).json({
      error: "The name or number is missing.",
    });
  }

  const person = {
    id: generatedId(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  // 201 Created
  res.send(person);

  // 409 Conflict
  if (body.name && body.number) {
    return res.status(409).json({
      error: "Name must be unique",
    });
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
