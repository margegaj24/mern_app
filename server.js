const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const operations = require("./db/operations.js");

app.post("/students", (req, res) => {
  const newStudent = req.body;
  operations.Student.createNewStudent(newStudent)
    .then(() => {
      res.status(200).json({ message: "New student successfully created" });
    })
    .catch((error) => res.status(400).json({ message: error.toString() }));
});

app.get("/students", (req, res) => {
  operations.Student.getAllStudents()
    .then((allStudents) => {
      res.status(200).json(allStudents);
    })
    .catch((error) => res.status(400).json({ message: error.toString() }));
});

app.get("/student/:id", (req, res) => {
  operations.Student.getStudent(req.params.id)
    .then((student_obj) => {
      res.status(200).json(student_obj);
    })
    .catch((error) => res.status(400).json({ message: error.toString() }));
});

app.delete("/student/:id", (req, res) => {
  operations.Student.deleteStudent(req.params.id)
    .then(() => {
      res.status(200).json({ message: "Successfully deleted" });
    })
    .catch((error) => res.status(400).json({ message: error.toString() }));
});

app.post("/addStudentToClass/:classId", (req, res) => {
  var studentId = req.body.studentId;
  var classId = req.params.classId;
  operations.Klase.addStudentToClass(classId, studentId)
    .then()
    .catch((error) => res.status(400).json({ message: error.toString() }));
});

app.post("/classes", (req, res) => {
  const newClass = req.body;
  operations.Klase.createNewClass(newClass)
    .then(() => {
      res.status(200).json({ message: "New class successfully created" });
    })
    .catch((error) => res.status(400).json({ message: error.toString() }));
});

app.get("/classes", (req, res) => {
  operations.Klase.getAllClasses()
    .then((allClasses) => res.status(200).json(allClasses))
    .catch((error) => res.status(400).json({ message: error.toString() }));
});

app.get("/class/:id", (req, res) => {
  operations.Klase.getClassName(req.params.id)
    .then((class_obj) => res.status(200).json(class_obj))
    .catch((error) => res.status(400).json({ message: error.toString() }));
});

app.get("/", (req, res) => res.status(200).json({ message: "Hello world" }));

const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
