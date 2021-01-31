const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//const dbHelper = require("./helpers/db");
const app = express();
const fs = require("fs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const config = JSON.parse(fs.readFileSync("config.json"));

mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch((err) => console.error("Connection error", err));

const db = require("./models");
const operation = require("./db/operations");

app.post("/students", (req, res) => {
  console.log(req.body);
  const newStudent = req.body;
  operation
    .createNewStudent(newStudent)
    .then(() => {
      res.status(200).json({ message: "New student successfully created" });
    })
    .catch((error) => res.status(401).json({ message: error.toString() }));
});

app.get("/students", (req, res) => {
  operation.getAllStudents().then((allStudents) => {
    res.status(200).json(allStudents);
  });
});

app.get("/student/:id", (req, res) => {
  operation.getStudent(db, req.params.id).then((student_obj) => {
    res.status(200).json(student_obj);
  });
});

app.delete("/student/:id", (req, res) => {
  operation
    .deleteStudent(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Successfully deleted" });
    })
    .catch((error) => res.status(401).json({ message: error.toString() }));
});

app.post("/addStudentToClass/:classId", (req, res) => {
  var studentId = req.body.studentId;
  var classId = req.params.classId;
  operation.addStudentToClass(classId, studentId);
});

app.post("/classes", (req, res) => {
  const newClass = req.body;
  operation
    .createNewClass(newClass)
    .then(() => {
      res.status(200).json({ message: "New class successfully created" });
    })
    .catch((error) => res.status(401).json({ message: error.toString() }));
});

app.get("/classes", (req, res) => {
  operation.getAllClasses(db).then((allClasses) => res.status(200).json(allClasses));
});

app.get("/class/:id", (req, res) => {
  operation.getClassName(db, req.params.id).then((class_obj) => res.status(200).json(class_obj));
});

app.get("/", (req, res) => res.status(200).json({ message: "Hello world" }));

const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
