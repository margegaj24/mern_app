const config = require("config.json");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

let isConnected;
module.exports = {
  connectToMongoose: () => {
    if (isConnected) {
      console.log("=> using existing database connection");
      return Promise.resolve();
    } else {
      mongoose
        .connect(config.dbUri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        })
        .then((result) => {
          isConnected = result.connections[0].readyState;
          console.log("Successfully connect to MongoDB.");
        })
        .catch((error) => {
          console.log("Connection error MongoDB:", error.message);
        });
    }
  },
};
