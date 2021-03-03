const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const serverless = require("serverless-http");

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const studentRoute = require("./routes/student");
const courseRoute = require("./routes/course");

app.use("/students", studentRoute);
app.use("/courses", courseRoute);

app.get("/", (req, res) => res.status(200).json({ message: "Hello world" }));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports.handler = serverless(app);
