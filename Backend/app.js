const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
//const errorMiddleware = require("./middlewares/error");
const app = express();
var session = require("express-session");
var cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "cmpe273_etsy",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);
/*if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}*/

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(bodyParser.json());

app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/shopRoutes"));
app.use("/", require("./routes/itemRoutes"));

// app.use("/", require("./routes1/authentication"));
// app.use("/", require("./routes1/registerRoute"));
// app.use("/", require("./routes1/loginRoute"));
// app.use("/", require("./routes1/userProfileRoute"));

//app.use(errorMiddleware);

module.exports = app;
