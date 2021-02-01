const db = require("../models");

function createNewClass(class_obj) {
  return db.Class.create(class_obj);
}
function getClassName(classId) {
  return db.Class.findById(classId);
}
function getAllClasses() {
  return db.Class.find({});
}
function addStudentToClass(classId, studentId) {
  return db.Class.findByIdAndUpdate(
    classId,
    { $push: { students: studentId } },
    { new: true, useFindAndModify: false }
  );
}
function deleteClass(classId) {
  return db.Class.findByIdAndDelete(classId);
}

module.exports = {
  createNewClass,
  getClassName,
  getAllClasses,
  addStudentToClass,
  deleteClass,
};
