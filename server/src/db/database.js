const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DB_CONNECTION_STRING}/RaktakoshOdisha`,
    );
    console.log(
      `\n MOngoDB Connected !! DB HOST : ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = { connectDB };
