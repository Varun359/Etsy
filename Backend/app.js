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
app.use("/profile", express.static("uploads/images"));

app.use(
  session({
    secret: "cmpe273_etsy",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use("/uploads", express.static("./uploads"));
/*if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}*/

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/shopRoutes"));
app.use("/", require("./routes/itemRoutes"));
app.use("/", require("./routes/imageRoutes"));
// app.use("/", require("./routes1/authentication"));
// app.use("/", require("./routes1/registerRoute"));
// app.use("/", require("./routes1/loginRoute"));
// app.use("/", require("./routes1/userProfileRoute"));

//app.use(errorMiddleware);
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./uploads/images",
  filename: (req, file, callBack) => {
    return callBack(
      null,
      `${path
        .basename(file.originalname)
        .replace(".", "_")
        .replace(" ", "_")}_${file.fieldname}_${Date.now()}_${path.extname(
        file.originalname
      )}`
    );
  },
});

const upload = multer({
  storage: storage,
});

app.use("/profile", express.static("uploads/images"));

app.post("/upload", async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single("profile");
    upload(req, res, function (err) {
      if (!req.files) {
        return res.send("Please select an image to upload");
      } else if (err instanceof multer.MulterError) {
        return res.send(err);
      } else if (err) {
        return res.send(err);
      }
      console.log(req.files);
      console.log(req.body.name);
      res.json({
        success: 1,
        profile_url: `http://localhost:3001/profile/${req.file.filename}`,
      });
    });
  } catch (err) {
    console.log("in ", err);
  }
});

module.exports = app;
