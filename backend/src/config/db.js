const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("🟢 MongoDB Connected Successfully!");
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.name}`);
    console.log("✅ Ready to serve!");
  } catch (error) {
    console.error("🔴 MongoDB Connection FAILED!");
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB Disconnected Successfully!");
  } catch (error) {
    console.error("Disconnect Error:", error.message);
  }
};

module.exports = { connectDB, disconnectDB };
  