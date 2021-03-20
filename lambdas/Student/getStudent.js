const db = require("./models");
const { connectToMongoose } = require("./db");

module.exports = {
  handler: async () => {
    connectToMongoose();
    var data = await db.Student.find({});
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },
};
