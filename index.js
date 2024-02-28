const express = require("express");
const dotenv = require("dotenv");
const { connectToDB } = require("./src/config/db");
const { mainRouter } = require("./src/api/routes/main-router");
const { configCloudinary } = require("./src/middlewares/files-middleware");
const cors = require("cors");
const {
  notFound,
  errorHandler,
} = require("./src/middlewares/error-middleware");
const api = express();

dotenv.config();
configCloudinary();

api.use(express.json());
api.use(express.urlencoded({ extended: false }));
api.use(
  cors({
    origin: ["https://front-meetout.vercel.app", "http://localhost:5173"],
  })
);

api.use("/api/v1", mainRouter);
api.use(notFound);
api.use(errorHandler);

const PORT = process.env.PORT;
api.listen(PORT || 3000, () => {
  connectToDB();
  console.log(`App is listening to port ${PORT} 😉`);
});
module.exports = { api };
