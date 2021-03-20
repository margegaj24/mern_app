const db = require("../../models");
const { connectToMongoose } = require("../../db");

module.exports.handler = async (event) => {
    connectToMongoose();
    var data = await db.Student.findById(event.params.id);
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },
};
