require("dotenv").config();
const app = require("./src/app");
const { connectDB } = require("./src/config/db");

const startServer = async () => {
  try {
    await connectDB(); // ✅ await added
    const PORT = process.env.PORT || 5050;

    app.listen(PORT, () => {
      console.log(`Server is running at Port: ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
