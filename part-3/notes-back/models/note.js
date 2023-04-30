const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
mongoose.set("strictPopulate", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: "true" })
  .then((result) => {
    console.log("Connected to Mongodb");
  })
  .catch((error) => {
    console.log("Error connecting to mongodb", error.message);
  });

const noteSchema = new mongoose.Schema({
  content: { type: String, minLength: 5, required: true },
  important: Boolean,
  date: Date,
});

noteSchema.plugin(uniqueValidator);

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Note", noteSchema);
