const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./routes/index.routes");
const errorHandler = require("./middlewares/error.middleware");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.json({ message: "Backend Working! Job Tracker API Live 🚀" });
});
app.use("/api", routes);
 
const swaggerRouter = require("./config/swagger");
app.use("/api-docs", swaggerRouter); 
app.use(errorHandler);

module.exports = app;
