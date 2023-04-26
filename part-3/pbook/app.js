const express = require("express");
const PORT = 3002;
const app = express();

let persons = [
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

app.get("/info", (req, res) => {
  let d = Date(Date.now());
  let a = d.toString();
  res.send(`<div><p>Phonebook has info for 2 people</p><p>${a}</p></div>`);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

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

const generatedId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.content) {
    //   400 Bad Request
    return res.status(400).json({
      error: "The name or number is missing.",
    });
  }
  // 409 Conflict
  else if (body.content) {
    return res.status(409).json({
      error: "Name must be unique",
    });
  }

  const person = {
    content: body.content,
    important: body.important || false,
    id: generatedId(),
  };

  persons = persons.concat(person);
  // 201 Created
  res.status(201).json({ message: "New entry created successfully" });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
