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
function addStudentToCourses(courseIds, studentId) {
  return db.Course.updateMany(
    { _id: {$in: courseIds}},
    { $addToSet: {students: studentId}}
  );
}
function deleteCourse(courseId) {
  return db.Course.findByIdAndDelete(courseId);
}

function deleteStudent(studentId) {
  return db.Course.updateMany({}, {$pull : {students: {$in: [studentId]}}}, { multi: true });
}

module.exports = {
  createNewCourse,
  getCourseName,
  getAllCourses,
  addStudentToCourse,
  deleteCourse,
  addStudentToCourses,
  deleteStudent,
};
