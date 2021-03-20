const models = require("../../models");
const { connectToMongoose } = require("../../db");

module.exports.handler = async () => {
  connectToMongoose();
  var data = await models.Course.find({});
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
