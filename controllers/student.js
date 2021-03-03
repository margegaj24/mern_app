const operations = require("./db-operations/operations.js");

module.exports = {
  createNewStudent: async (req, res) => {
    try {
      var newStudent = req.body;
      var createdStudent = await operations.Student.createNewStudent(newStudent);
      if (newStudent.courses.length > 0)
        await operations.Course.addStudentToCourses(newStudent.courses, createdStudent._id);
      res.status(200).json({ message: "New student successfully created" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getStudent: async (req, res) => {
    try {
      var studentObject = await operations.Student.getStudent(req.params.id);
      res.status(200).json(studentObject);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllStudents: async (req, res) => {
    try {
      var allStudents = await operations.Student.getAllStudents();
      res.status(200).json(allStudents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  deleteStudent: async (req, res) => {
    try {
      await operations.Student.deleteStudent(req.params.id);
      await operations.Course.deleteStudent(req.params.id);
      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateStudent: async (req, res) => {
    try {
      if (req.body.name !== "") propertyToUpdate = { name: req.body.name };
      else if (req.body.surname !== "") propertyToUpdate = { surname: req.body.surname };
      else res.status(400);
      await operations.Student.updateStudent(req.params.id, propertyToUpdate);
      res.status(200).json({ message: "Student successfully updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  addStudentToCourse: async (req, res) => {
    try {
      var studentId = req.body.studentId;
      var courseId = req.body.courseId;
      await operations.Course.addStudentToCourse(courseId, studentId);
      res.status(200).json({ message: "Successfully added student to course " + courseId });
    } catch (error) {
      res.status(200).json({ error: error.message });
    }
  },
};
