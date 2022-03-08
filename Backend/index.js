var express = require("express");
var mysql = require("mysql");
const { addListener } = require("./database");
//const { createConnection } = require("net");
var session = require("express-session");
var connection = require("./database");
var app = express();
var cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

var bodyParser = require("body-parser");

/*app.get('/',(req,res) => {
   let sql="SELECT * from Employee_info";
   connection.query(sql,function(err,result){
       if(err) throw err;
       res.send(result)
   })
});*/
app.use(bodyParser.json());

app.use("/", require("./routes/authentication"));
app.use("/", require("./routes/registerRoute"));
app.use("/", require("./routes/loginRoute"));
app.use("/", require("./routes/userProfileRoute"));

app.listen(3001, () => {
  console.log("App listening on port 3001");
  connection.connect(function (err) {
    if (err) throw err;
    console.log("database connected");
  });
});
