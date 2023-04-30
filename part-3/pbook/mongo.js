const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://linhng92:${password}@cluster0.wndr2gx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phoneSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: Number,
});

const Phonebook = mongoose.model("Phonebook", phoneSchema);


