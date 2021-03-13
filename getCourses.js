const config = require("./config.json");
const db = require("./models");
const mongoose = require("mongoose");

mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {})
  .catch((err) => {});

module.exports = {
  handler: async (event, context, callback) => {
    var data = await db.Course.find({});
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ msg: "hello" }),
    });
  },
};
