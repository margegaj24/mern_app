const models = require("../../models");
const { connectToMongoose } = require("../../db");

module.exports.handler = async (event, context, callback) => {
  connectToMongoose();
  try {
    var data = await models.Student.find({}); //.populate("name", "surname");
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.log(error);
  }
};
