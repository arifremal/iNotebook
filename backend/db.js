const mongoose = require("mongoose");


const connectToMongo = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/inotebook');
    console.log("Connected to MongoDBs");
  } catch (error) {
    console.error("Connection error:", error);
  }
};
module.exports = connectToMongo;
