const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const phoneRegExp = /^(\d{2,3})-(\d+)$/;

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
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function (v) {
        return phoneRegExp.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    required: [true, "user phone number required"],
    unique: true,
  },
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
