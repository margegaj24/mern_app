const models = require("../../models");
const { connectToMongoose } = require("../../db");

module.exports = {
  handler: async (event, context) => {
    connectToMongoose();
    await db.Course.create(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },
};
