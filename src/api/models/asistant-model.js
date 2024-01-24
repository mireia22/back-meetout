const mongoose = require("mongoose");

const asistantSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    assistedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "event" }],
  },
  {
    timestamps: true,
  }
);

const Asistant = mongoose.model("asistant", asistantSchema, "asistant");

module.exports = Asistant;
