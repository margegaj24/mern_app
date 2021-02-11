const config = require("../config.json");
const mongoose = require("mongoose");

mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Successfully connect to MongoDB."))
  .catch((err) => console.error("Connection error", err));

module.exports = {
  Course: require("./Course"),
  Student: require("./Student"),
};
