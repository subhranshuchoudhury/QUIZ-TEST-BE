const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    // username: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    recoveryCode: {
      OTP: { type: String, default: null },
      expires: { type: Date, default: null },
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
