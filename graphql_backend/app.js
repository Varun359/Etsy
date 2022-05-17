const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const checkAuth = require("./middlewares/auth");
var cors = require("cors");
const morgan = require("morgan");

//const errorMiddleware = require("./middlewares/error");

const app = express();
app.use(express.json());
app.use(morgan("short"));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type",
    "Authorization"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

var session = require("express-session");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use("/profile", express.static("uploads/images"));
app.use("/images", express.static("./images"));

app.use(
  session({
    secret: "cmpe273_etsy",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

// app.use(checkAuth);

const { query } = require("./Graphql/Query");
const { mutation } = require("./Graphql/Mutation");

//graphql
const { graphqlHTTP } = require("express-graphql");
const { GraphQLSchema } = require("graphql");
const schema = new GraphQLSchema({
  query: query,
  mutation: mutation,
});
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.use("/uploads", express.static("./uploads"));
/*if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}*/

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(express.json());
app.use("/", require("./routes/userRoutes"));
app.use("/", require("./routes/shopRoutes"));
app.use("/", require("./routes/itemRoutes"));
//app.use("/", require("./routes/imageRoutes"));
app.use("/", require("./routes/purchaseRoutes"));
app.use("/", require("./routes/cartRoutes"));
// app.use("/", require("./routes1/authentication"));
// app.use("/", require("./routes1/registerRoute"));
// app.use("/", require("./routes1/loginRoute"));
// app.use("/", require("./routes1/userProfileRoute"));

//app.use(errorMiddleware);
const multer = require("multer");
const storage = multer.diskStorage({
  destination: "./images",
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

const s3 = new aws.S3({
  accessKeyId: "AKIAZSRVTBBNQHCHG6FK",
  secretAccessKey: "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",
  region: "us-west-1",
});

exports.uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: "etsyimages",
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
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
