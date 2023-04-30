const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

mongoose
  .connect(url, { useNewUrlParser: true })
  .then((response) => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log("fail to connect to db", error.message);
  });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  number: { type: String, required: true, unique: true },
});

personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
