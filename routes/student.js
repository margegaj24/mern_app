const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student");

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudent);
router.post("/", studentController.createNewStudent);
router.post("/addStudentToCourse/", studentController.addStudentToCourse);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
