const express = require("express");
const PORT = 3002;
const app = express();

const persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).json({
      error: "The person with that id is not found.",
    });
  }
});

app.get("/info", (req, res) => {
  let d = Date(Date.now());
  let a = d.toString();
  res.send(`<div><p>Phonebook has info for 2 people</p><p>${a}</p></div>`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
