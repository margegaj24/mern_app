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
function deleteStudent(studentId) {
  return db.Student.findById({ _id: studentId }, (student) => {
    var studentClasses = student.classes;
    if (studentClasses.length > 0)
      studentClasses.forEach((className) => {
        db.Class.findOne({ name: className }, (class_obj) => {
          var studentIndex = class_obj.indexOf(studentId);
          class_obj.pop(studentIndex);
        });
      });
  });
}

module.exports = {
  getStudent,
  getAllStudents,
  createNewStudent,
  addClassToStudent,
  deleteStudent,
};
