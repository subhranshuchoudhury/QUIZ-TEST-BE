const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
});

module.exports = model("User", UserSchema);
