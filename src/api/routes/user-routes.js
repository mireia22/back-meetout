const express = require("express");
const {
  getAllUsers,
  getUser,
  editUser,
  deleteUserById,
  deleteAllUsers,
} = require("../controllers/user-controllers");
const { isAuth } = require("../../middlewares/auth-middleware");
const { upload } = require("../../middlewares/files-middleware");

const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.get("/user", isAuth, getUser);
userRouter.put("/edit", upload.single("avatar"), isAuth, editUser);
userRouter.delete("/:id", deleteUserById);
userRouter.delete("/", deleteAllUsers);

module.exports = { userRouter };
