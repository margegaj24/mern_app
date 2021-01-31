var mongoose = require("mongoose");

const classSchema = mongoose.Schema({
  name: {
    type: String,
    enum: ["Web Development", "Data structures & Algorithms", "Physics", "Machine Learning"],
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
