const student = require("../../models/Student");
const { connectToMongoose } = require("../../db");

connectToMongoose();

module.exports = {
  handler: async (event, context, callback) => {
    var data = await db.Student.find({});
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ msg: "hello" }),
    });
  },
};
