const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");

app.use(cors({ origin: "*" }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

const studentRoute = require("./routes/student.route.js");
const courseRoute = require("./routes/course");

app.use("/students", studentRoute);
app.use("/courses", courseRoute);

module.exports.handler = serverless(app);
