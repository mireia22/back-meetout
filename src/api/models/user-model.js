const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, unique: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true, required: true },
    avatar: { type: String, trim: true },
    postedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
    asistedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hashSync(this.password, 10);

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("user", userSchema, "user");

module.exports = User;
