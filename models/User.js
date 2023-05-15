const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  avatar: {
    type: String,
    default: "",
  },
  refreshToken: {
    type: String,
    default: "",
  },
  role: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);
