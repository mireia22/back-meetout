const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String },
    ubication: { type: String },
    sport: { type: String },
    description: { type: String },
    createdBy: { type: mongoose.Schema.ObjectId, ref: "user" },
    eventImage: { type: String, trim: true },
    difficulty: { type: String, trim: true },
    participants: [{ type: mongoose.Schema.ObjectId, ref: "asistant" }],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("event", eventSchema, "event");

module.exports = Event;
