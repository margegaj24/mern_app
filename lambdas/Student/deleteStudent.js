const models = require("../../models");
const { connectToMongoose } = require("../../db");

module.exports.handler = async (event) => {
  connectToMongoose();
  var data = await models.Student.findByIdAndDelete(event.params.id);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
