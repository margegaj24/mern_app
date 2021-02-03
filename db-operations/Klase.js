const db = require("../models");

function createNewClass(class_obj) {
  return db.Klase.create(class_obj);
}
function getClassName(classId) {
  return db.Klase.findById(classId);
}
function getAllClasses() {
  return db.Klase.find({});
}
function addStudentToClass(classId, studentId) {
  return db.Klase.findByIdAndUpdate(
    classId,
    { $push: { students: studentId } },
    { new: true, useFindAndModify: false }
  );
}
function deleteClass(classId) {
  return db.Klase.findByIdAndDelete(classId);
}

module.exports = {
  createNewClass,
  getClassName,
  getAllClasses,
  addStudentToClass,
  deleteClass,
};
