const express = require("express");
const dotenv = require("dotenv");
const { connectToDB } = require("./src/config/db");
const { mainRouter } = require("./src/api/routes/main-router");
const { configCloudinary } = require("./src/middlewares/files-middleware");
const cors = require("cors");
const api = express();

dotenv.config();
configCloudinary();

api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(
  cors({
    origin: "https://front-meetout.vercel.app",
  })
);

api.use("/api/v1", mainRouter);
api.use("*", (req, res) => {
  res.send("Hello world.");
});

api.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

const PORT = process.env.PORT;
api.listen(PORT || 3000, () => {
  connectToDB();
  console.log(`App is listening to port ${PORT} 😉`);
});
module.exports = { api };
