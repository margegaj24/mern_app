const config = require("./config.json");
const db = require("./models");
const { connectToMongoose } = require("./db");

module.exports = {
  handler: async (event, context, callback) => {
    console.log("test 1");
    connectToMongoose();
    console.log("gfkghdfjtrs");
    var data = await db.Course.find({});
    console.log(data);
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
    //callback(null, );
  },
};
