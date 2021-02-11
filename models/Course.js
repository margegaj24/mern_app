var mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    enum: ["Web Development", "Data structures & Algorithms", "Physics", "Machine Learning"],
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
