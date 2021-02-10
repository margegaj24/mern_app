const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');
app.use(cors({origin: "*", optionsSuccessStatus: 200}));
/*app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const operations = require("./db-operations/operations.js");

app.post("/students", async (req, res) => {
  try {
    const newStudent = req.body;
    await operations.Student.createNewStudent(newStudent);
    res.status(200).json({ message: "New student successfully created" });
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    if (req.body.name !== "") propertyToUpdate = {name: req.body.name}
    else if (req.body.surname !== "") propertyToUpdate = {surname: req.body.surname}
    else res.status(400);
    await operations.Student.updateStudent(req.params.id, propertyToUpdate);
    res.status(200).json({ message: "Student successfully updated" });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

app.get("/students", async (req, res) => {
  try {
    var allStudents = await operations.Student.getAllStudents();
    res.status(200).json(allStudents);
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    var studentObject = await operations.Student.getStudent(req.params.id);
    res.status(200).json(studentObject);
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    await operations.Student.deleteStudent(req.params.id);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

app.post("/addStudentToKlase", async (req, res) => {
  try {
    var studentId = req.body.studentId;
    var classId = req.body.classId;
    await operations.Klase.addStudentToClass(classId, studentId);
    res.status(200).json({ message: "Successfully added student to klase " + classId });
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

app.post("/classes", async (req, res) => {
  try {
    const newClass = req.body;
    await operations.Klase.createNewClass(newClass);
    res.status(200).json({ message: "New class successfully created" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get("/classes", async (req, res) => {
  try {
    var allClasses = await operations.Klase.getAllClasses();
    res.status(200).json(allClasses);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.get("/class/:id", async (req, res) => {
  try {
    var klase = await operations.Klase.getClassName(req.params.id);
    res.status(200).json(klase);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

app.post("/addKlaseToStudent", async (req, res) => {
  try {
    var studentId = req.body.studentId;
    var classId = req.body.classId;
    await operations.Student.addClassToStudent(studentId, classId);
    res.status(200).json({ message: "Successfully added klase to student " + studentId });
  } catch (error) {
    res.status(200).json({ error: error });
  }
});

app.get("/", (req, res) => res.status(200).json({ message: "Hello world" }));

const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
