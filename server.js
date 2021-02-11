const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const operations = require("./db-operations/operations.js");

app.post("/students", async (req, res) => {
  try {
    const newStudent = req.body;
    await operations.Student.createNewStudent(newStudent);
    res.status(200).json({ message: "New student successfully created" });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

app.put("/student/:id", async (req, res) => {
  try {
    if (req.body.name !== "") propertyToUpdate = { name: req.body.name };
    else if (req.body.surname !== "") propertyToUpdate = { surname: req.body.surname };
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
    res.status(200).json({ error: error.message });
  }
});

app.get("/student/:id", async (req, res) => {
  try {
    var studentObject = await operations.Student.getStudent(req.params.id);
    res.status(200).json(studentObject);
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

app.delete("/student/:id", async (req, res) => {
  try {
    await operations.Student.deleteStudent(req.params.id);
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

app.post("/addStudentToCourse", async (req, res) => {
  try {
    var studentId = req.body.studentId;
    var courseId = req.body.courseId;
    await operations.Course.addStudentToCourse(courseId, studentId);
    res.status(200).json({ message: "Successfully added student to course " + courseId });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

app.post("/courses", async (req, res) => {
  try {
    const courseName = req.body;
    await operations.Course.createNewCourse(courseName);
    res.status(200).json({ message: "New course successfully created" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/courses", async (req, res) => {
  try {
    var allCourses = await operations.Course.getAllCourses();
    res.status(200).json(allCourses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/course/:id", async (req, res) => {
  try {
    var klase = await operations.Course.getCourseName(req.params.id);
    res.status(200).json(klase);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/addCourseToStudent", async (req, res) => {
  try {
    var studentId = req.body.studentId;
    var courseId = req.body.courseId;
    await operations.Student.addCourseToStudent(studentId, courseId);
    res.status(200).json({ message: "Successfully added course to student " + studentId });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
});

app.get("/", (req, res) => res.status(200).json({ message: "Hello world" }));

const port = 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
