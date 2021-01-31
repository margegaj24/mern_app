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

function createNewStudent(student) {
  return db.Student.create(student);
}

function deleteStudent(studentId) {
  return db.Student.findById({ _id: studentId }, (student) => {
    var studentClasses = student.classes;
    studentClasses.forEach((className) => {
      db.Class.findOne({ name: className }, (class_obj) => {
        var studentIndex = class_obj.indexOf(studentId);
        class_obj.pop(studentIndex);
      });
    });
  });
}

function addStudentToClass(classId, studentId) {
  return db.Class.findByIdAndUpdate(
    classId,
    { $push: { students: studentId } },
    { new: true, useFindAndModify: false }
  );
}

function addClassToStudent(studentId, classId) {
  return db.Student.findByIdAndUpdate(
    studentId,
    { $push: { classes: classId } },
    { new: true, useFindAndModify: false }
  );
}

function getAllStudents() {
  return db.Student.find({});
}

function getStudent(studentId) {
  return db.Student.findById(studentId);
}

app.post("/students", (req, res) => {
  console.log(req.body);
  const newStudent = req.body;
  createNewStudent(newStudent)
    .then(() => {
      res.status(200).json({ message: "New student successfully created" });
    })
    .catch((error) => res.status(401).json({ message: error.toString() }));
});

app.get("/students", (req, res) => {
  getAllStudents().then((allStudents) => {
    res.status(200).json(allStudents);
  });
});

app.get("/student/:id", (req, res) => {
  getStudent(req.params.id).then((student_obj) => {
    res.status(200).json(student_obj);
  });
});

app.delete("/student/:id", (req, res) => {
  deleteStudent(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Successfully deleted" });
    })
    .catch((error) => res.status(401).json({ message: error.toString() }));
});

app.post("/addStudentToClass/:classId", (req, res) => {
  var studentId = req.body.studentId;
  var classId = req.params.classId;
  addStudentToClass(classId, studentId);
});

app.get("/", (req, res) => res.status(200).json({ message: "Hello world" }));

const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
