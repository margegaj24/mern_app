const db = require("../models");

function createNewStudent(student) {
  return db.Student.create(student); 
}

function getStudent(studentId) {
  return db.Student.findById(studentId, { name: 1, surname: 1 });
}

function getAllStudents() {
  return db.Student.find({});
}

function addCourseToStudent(studentId, courseId) {
  return db.Student.findByIdAndUpdate(
    studentId,
    { $push: { courses: courseId } },
    { new: true, useFindAndModify: false }
  );
}

function updateStudent(studentId, property) {
  return db.Student.findByIdAndUpdate(studentId, property);
}

async function deleteStudent(studentId) {
  return db.Student.findByIdAndDelete(studentId);
}

function deleteCourse(courseId) {
  return db.Students.updateMany({}, {$pull : {students: {$in: [studentId]}}}, { multi: true });
}

module.exports = {
  getStudent,
  getAllStudents,
  createNewStudent,
  addCourseToStudent,
  deleteStudent,
  updateStudent,
  deleteCourse,
};
