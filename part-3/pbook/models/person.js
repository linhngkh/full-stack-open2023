const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url, { useNewUrlParser: true })
  .then((response) => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("fail to connect to db", error.message);
  });

const phoneSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", phoneSchema);

phoneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phoneSchema);
