module.exports = {
  createNewStudent: (db, student) => {
    return db.Student.create(student);
  },
  createNewClass: (db, class_obj) => {
    return db.Class.create(class_obj);
  },
  getStudent: (db, studentId) => {
    return db.Student.findById(studentId);
  },
  getClassName: (db, classId) => {
    return db.Class.findById(classId);
  },
  getAllStudents: (db) => {
    return db.Student.find({});
  },
  getAllClasses: (db) => {
    return db.Class.find({});
  },
  addClassToStudent: (db, studentId, classId) => {
    return db.Student.findByIdAndUpdate(
      studentId,
      { $push: { classes: classId } },
      { new: true, useFindAndModify: false }
    );
  },
  addStudentToClass: (db, classId, studentId) => {
    return db.Class.findByIdAndUpdate(
      classId,
      { $push: { students: studentId } },
      { new: true, useFindAndModify: false }
    );
  },
  deleteStudent: (db, studentId) => {
    return db.Student.findById({ _id: studentId }, (student) => {
      var studentClasses = student.classes;
      studentClasses.forEach((className) => {
        db.Class.findOne({ name: className }, (class_obj) => {
          var studentIndex = class_obj.indexOf(studentId);
          class_obj.pop(studentIndex);
        });
      });
    });
  },
};
