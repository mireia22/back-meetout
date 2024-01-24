const User = require("../api/models/User-model");
const { verifyToken } = require("../utils/token");

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) return next(new Error("Unauthorized"));
  try {
    const decodedToken = verifyToken(token);

    const user = await User.findById(decodedToken.id);
    if (!user) {
      throw new Error(`User with id ${decodedToken.id} not found in DB.`);
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).json({ message: "Unauthorized" });
  }
};

module.exports = { isAuth };
