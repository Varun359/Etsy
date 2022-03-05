var express = require("express");
var mysql = require("mysql");
const { addListener } = require("./database");
//const { createConnection } = require("net");
var connection = require('./database')
var app = express();
var cors = require("cors");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
var bodyParser = require("body-parser");

/*app.get('/',(req,res) => {
   let sql="SELECT * from Employee_info";
   connection.query(sql,function(err,result){
       if(err) throw err;
       res.send(result)
   })
});*/
app.use(bodyParser.json());

app.use('/',require('./routes/pages'));


app.listen(3001, () =>{
  console.log('App listening on port 3001');
  connection.connect(function(err){
      if(err)
       throw err;
      console.log("database connected")
  })
})

