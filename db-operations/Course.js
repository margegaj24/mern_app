const db = require("../models");

function createNewCourse(course_obj) {
  return db.Course.create(course_obj);
}
function getCourseName(courseId) {
  return db.Course.findById(courseId);
}
function getAllCourses() {
  return db.Course.find({});
}
function addStudentToCourse(courseId, studentId) {
  return db.Course.findByIdAndUpdate(
    courseId,
    { $push: { students: studentId } },
    { new: true, useFindAndModify: false }
  );
}
function deleteCourse(courseId) {
  return db.Course.findByIdAndDelete(courseId);
}

module.exports = {
  createNewCourse,
  getCourseName,
  getAllCourses,
  addStudentToCourse,
  deleteCourse,
};
