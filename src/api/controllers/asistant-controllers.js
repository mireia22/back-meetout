const User = require("../models/User-model");
const Asistant = require("../models/asistant-model");
const Event = require("../models/event-model");

const getAllAssistants = async (req, res, next) => {
  try {
    const allAsistants = await Asistant.find().populate("assistedEvents");
    return res.status(200).json(allAsistants);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const getAsistantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const asistant = await Asistant.findById(id).populate("assistedEvents");
    return res.status(200).json(asistant);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteAsistantById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Asistant.findByIdAndDelete(id);
    return res.status(200).json({ message: "Asistant deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteAllAsistants = async (req, res, next) => {
  try {
    await Asistant.deleteMany();
    return res
      .status(200)
      .json({ message: "All Asistants deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllAssistants,
  getAsistantById,
  deleteAsistantById,
  deleteAllAsistants,
};
