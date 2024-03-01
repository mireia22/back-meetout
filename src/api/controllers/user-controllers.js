const { HttpError } = require("../../middlewares/error-middleware");
const {
  deleteImgCloudinary,
  defaultCloudinaryImages,
} = require("../../middlewares/files-middleware");
const { isEmailValid } = require("../../utils/validFields");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("asistedEvents");
    return res.status(200).json(allUsers);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id)
      .populate("asistedEvents")
      .populate("postedEvents")
      .select("-password");
    console.log("USER", user);

    return res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const editUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (req.user._id.toString() !== id) {
      return next(
        new HttpError("You can't modify someone that is not you.", 400)
      );
    }
    const { name, email, password } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (existingUser?.avatar && req.file) {
      deleteImgCloudinary(existingUser.avatar);
    }
    if (!isEmailValid(email)) {
      return next(new HttpError("Invalid email address format.", 400));
    }
    const updatedFields = {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password: bcrypt.hashSync(password, 10) }),
      avatar: req.file
        ? req.file.path
        : existingUser.avatar || defaultCloudinaryImages.user,
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(new HttpError(error));
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (user?.avatar) {
      deleteImgCloudinary(user.avatar);
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return next(new HttpError(error));
  }
};
const deleteAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    for (const user of users) {
      await User.findByIdAndDelete(user._id);
      if (user.avatar) {
        deleteImgCloudinary(user.avatar);
      }
    }
    return res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  editUser,
  deleteUserById,
  deleteAllUsers,
};
