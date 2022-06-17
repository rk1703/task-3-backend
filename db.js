const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://ravibaghel:yiSYcf3X8wjgg0sx@cluster0.vf5y2.mongodb.net/task-3?retryWrites=true&w=majority";

const connectToMongo = () => {
  mongoose.connect(
    mongoURI,
    { keepAlive: true, useNewUrlParser: true },
    (err) => {
      if (err) console.log("error", err);
      else console.log("connect to mongo");
    }
  );
};

module.exports = connectToMongo;
