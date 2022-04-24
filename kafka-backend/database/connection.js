// const mongoose = require("mongoose");
// // const MONGO_URI =
// //   "mongodb+srv://admin:nopassword@cluster0.5avxi.mongodb.net/etsy?retryWrites=true&w=majority";
// const MONGO_URI =
//   "mongodb+srv://admin:j0LAn0vXHMcWIKXv@clusterlab2.c3mj9.mongodb.net/Users?retryWrites=true";
// const connection = () => {
//   mongoose.connect(MONGO_URI).then(() => {
//     console.log("Mongoose Connected");
//   });
// };

// module.exports = connection;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //mongodb connection string
    console.log("Hello");
    const con = await mongoose.connect(
      "mongodb+srv://admin:nopassword@cluster0.5avxi.mongodb.net/etsy?retryWrites=true&w=majority"
    );

    console.log(`Mongo db connected`);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
