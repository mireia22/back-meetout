const { deleteImgCloudinary } = require("../../middlewares/files-middleware");
const User = require("../models/User-model");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().populate("asistedEvents");
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
  }
};

const editUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    if (req.user._id.toString() !== id) {
      return res.status(400).json("You can't modify somenone that is not you.");
    }
    const { name, email, password } = req.body;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (existingUser?.avatar && req.file) {
      deleteImgCloudinary(existingUser.avatar);
    }

    const updatedFields = {};
    if (name !== "") {
      updatedFields.name = name;
    }
    if (email !== "") {
      updatedFields.email = email;
    }
    if (password !== undefined && password !== existingUser.password) {
      updatedFields.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        ...updatedFields,
        avatar: req.file
          ? req.file.path
          : existingUser.avatar || "no user avatar",
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
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
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUser,
  editUser,
  deleteUserById,
  deleteAllUsers,
};
