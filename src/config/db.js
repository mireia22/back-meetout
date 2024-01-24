const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Connected to MONGODB 🟢");
  } catch (error) {
    console.log(error);
  }
};

const disconnectFromDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("Disconnected from MONGODB 🔴");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { connectToDB, disconnectFromDB };
