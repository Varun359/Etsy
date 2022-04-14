const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://admin:nopassword@cluster0.5avxi.mongodb.net/etsy?retryWrites=true&w=majority";

const connection = () => {
  mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Mongoose Connected");
    });
};

module.exports = connection;
