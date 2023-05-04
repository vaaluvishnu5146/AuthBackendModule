const mongoose = require("mongoose");

const SignupSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmailId: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recentOtp: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("user", SignupSchema);
