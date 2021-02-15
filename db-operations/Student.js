const db = require("../models");

function createNewStudent(student) {
  return db.Student.create(student); 
}

function getStudent(studentId) {
  return db.Student.findById(studentId, { name: 1, surname: 1 });
}

function getAllStudents() {
  return db.Student.find({});
  //   , (error, documents) => {
  //   var allStudents = [];
  //   documents.forEach(document => {
  //     var student = { id: document.id, name: document.name, surname: document.surname }
  //     var studentCourses = document.courses;
  //     if (studentCourses.length > 0) {
  //       var courseNames = []
  //       studentCourses.forEach({})
  //     }

  //     allStudents.push()
  //   })
  // });
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
  var student = await db.Student.findById(studentId, { courses: true })
    .exec()
    .then((student) => {
      return student;
    });
  //test this await
  if (student.courses.length > 0)
    student.courses.map((courseId) => db.Course.updateMany({ _id: courseId }, { $pull: { students: studentId } }));
  return db.Student.findByIdAndDelete(studentId);
}

module.exports = {
  getStudent,
  getAllStudents,
  createNewStudent,
  addCourseToStudent,
  deleteStudent,
  updateStudent,
};
