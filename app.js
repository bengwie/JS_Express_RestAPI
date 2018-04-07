'use strict';

const express = require('express');
var app = express();
var jsonParser = require('body-parser').json;
var route = require('./route');
var logger = require("morgan");
var portNum = process.env.PORT || 3000;

var jsonHandle = function (req, res, next) {
   if (req.body) {
      console.log(req.body);
   } else {
      console.log("req.body is empty");
   }
   next();
}

app.use(logger("dev"));
app.use(jsonParser());
//app.use(jsonHandle);


var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/qa");

var db = mongoose.connection;

db.on("error", function(err) {
   console.error("connection error:" , err);
});

db.once("open", function() {
   console.log("db connection successful");
});

app.use("/questions", route);

app.listen(portNum, ()=> {
   console.log("I am listening to port 3000");
});

//Catch 404 exception, then forward this error handler
app.use((req, res, next) => {
   console.log("creating error 404 sample.");
   var err = new Error("Not Found");
   err.status = 404;
   next(err);
});

//Exception Handler
app.use((err, req, res, next) => {
   res.status(err.status || 500);
   console.log("status is ", res.statusCode);
   res.json({
      error : {
         status: res.statusCode,
         message: err.message
      }
   });
});

app.use((req, res, next) => {
   console.log("Testing rest api 1");
   next();
});

app.use("/different/:id", (req, res, next) => {
   console.log("Testing rest api 2 with ID: " + req.params.id);
   next();
});
