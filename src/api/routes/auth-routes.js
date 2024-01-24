const express = require("express");
const { register, login } = require("../controllers/auth-controllers");
const { upload } = require("../../middlewares/files-middleware");

const authRouter = express.Router();
authRouter.post("/register", upload.single("avatar"), register);
authRouter.post("/login", login);

module.exports = { authRouter };
