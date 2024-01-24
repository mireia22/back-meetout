const { generateToken } = require("../../utils/token");
const User = require("../models/User-model");
const bcrypt = require("bcrypt");
const { HttpError } = require("../../middlewares/error-middleware");
const { isEmailValid } = require("../../utils/validFields");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new HttpError("Fill in all the fields."));
    }
    if (!isEmailValid(email)) {
      return next(new HttpError("Invalid email address format.", 400));
    }
    const userExist = await User.findOne({ email });
    if (userExist) return next(new HttpError("Email already registered.", 400));

    const newUser = new User({
      name,
      email,
      password,
      avatar: req.file ? req.file.path : "/front-meetout/assets/avatar.png",
    });

    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: `New user ${savedUser.email} registered.` });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new HttpError("Fill in all the fields."));
    }
    if (!isEmailValid(email)) {
      return next(new HttpError("Invalid email address format.", 400));
    }

    const validUser = await User.findOne({ email });
    if (!validUser) return next(new HttpError("Email not registered yet."));

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (validPassword) {
      const { password, ...userWithoutPassword } = validUser._doc;
      const token = generateToken(validUser._id, validUser.email);
      return res.status(200).json({ token, user: userWithoutPassword });
    } else {
      return next(new HttpError("Wrong credentials."));
    }
  } catch (error) {
    return next(error);
  }
};

module.exports = { register, login };
