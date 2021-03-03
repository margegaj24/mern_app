const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourse);
router.post("/", courseController.createNewCourse);
//router.put("/:id", courseController.updateCourse);
router.post("/addCourseToStudent/", courseController.addStudentToCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
