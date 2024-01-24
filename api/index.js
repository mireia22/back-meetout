const express = require("express");
const dotenv = require("dotenv");
const { connectToDB } = require("../src/config/db");
const { mainRouter } = require("../src/api/routes/main-router");
const { configCloudinary } = require("../src/middlewares/files-middleware");
const cors = require("cors");
const app = express();

dotenv.config();
configCloudinary();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://front-meetout.vercel.app/"],
    allowedHeaders: "Content-Type,Authorization,credentials",
    credentials: true,
  })
);

app.use("/api/v1", mainRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, message, statusCode });
});

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
  connectToDB();
  console.log(`App is listening to port ${PORT} 😉`);
});
