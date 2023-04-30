const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://linhng92:${password}@cluster0.wndr2gx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictPopulate", false);
mongoose.connect(url, { useNewUrlParser: true });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is Easy",
  important: true,
});

// note.save().then((result) => {
//   console.log("noted saved!");
//   mongoose.connection.close();
// });
Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
