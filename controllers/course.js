const operations = require("../db-operations/operations");

module.exports = {
  getAllCourses: async (req, res) => {
    try {
      var allCourses = await operations.Course.getAllCourses();
      res.status(200).json(allCourses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getCourse: async (req, res) => {
    try {
      var course = await operations.Course.getCourse(req.params.id);
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteCourse: async (req, res) => {
    try {
      await operations.Course.deleteCourse(req.params.id);
      await operations.Student.deleteCourse(req.params.id);
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createCourse: async (req, res) => {
    try {
      const courseName = req.body;
      await operations.Course.createNewCourse(courseName);
      res.status(200).json({ message: "New course successfully created" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  addCourseToStudent: async (req, res) => {
    try {
      var studentId = req.body.studentId;
      var courseId = req.body.courseId;
      await operations.Student.addCourseToStudent(studentId, courseId);
      res.status(200).json({ message: "Successfully added course to student " + studentId });
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
};
