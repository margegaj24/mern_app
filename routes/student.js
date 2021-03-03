const express = require("express");
const router = express.Router();
const operations = require("../db-operations");

router.get("/", operations.Student.getAllStudents);
router.get("/:id", operations.Student.getStudent);
router.post("/", operations.Student.createNewStudent);
router.post("/addStudentToCourse/", operations.Student.addStudentToCourse);
router.put("/:id", operations.Student.updateStudent);
router.delete("/:id", operations.Student.deleteStudent);

module.exports = router;
