var mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  name: { type: String, minlength: 3, required: [true, "Provide a name"] },
  surname: { type: String, minlength: 3, required: [true, "Provide a surname"] },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
