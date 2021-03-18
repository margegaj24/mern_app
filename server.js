const express = require("express");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");

app.use(cors({ origin: "*", credentials: true }));
const { connectToMongoose } = require("./db");

connectToMongoose();
// const studentRoute = require("./routes/student.route.js");
// const courseRoute = require("./routes/course");

// app.use("/students", studentRoute);
// app.use("/courses", courseRoute);

module.exports.handler = serverless(app);
