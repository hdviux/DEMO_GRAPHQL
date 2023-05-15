const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOGB_CONNECT_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Succsess!!!");
  } catch (error) {
    console.log(error);
    console.log("Connected Failed!!!");
  }
};

module.exports = connectDB;
