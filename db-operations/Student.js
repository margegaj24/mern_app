const db = require("../models");

function createNewStudent(student) {
  return db.Student.create(student);
}
function getStudent(studentId) {
  return db.Student.findById(studentId);
}
function getAllStudents() {
  return db.Student.find({});
}
function addClassToStudent(studentId, classId) {
  return db.Student.findByIdAndUpdate(
    studentId,
    { $push: { classes: classId } },
    { new: true, useFindAndModify: false }
  );
}
function updateStudent(studentId, property){
  return db.Student.findByIdAndUpdate(studentId, property);
}

function deleteStudent(studentId) {
  return db.Student.findByIdAndDelete(studentId);
}

module.exports = {
  getStudent,
  getAllStudents,
  createNewStudent,
  addClassToStudent,
  deleteStudent,
  updateStudent,
};
