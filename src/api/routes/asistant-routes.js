const express = require("express");
const {
  getAllAssistants,
  getAsistantById,
  deleteAsistantById,
  deleteAllAsistants,
} = require("../controllers/asistant-controllers");

const asistantRouter = express.Router();
asistantRouter.get("/", getAllAssistants);
asistantRouter.get("/:id", getAsistantById);
asistantRouter.delete("/:id", deleteAsistantById);
asistantRouter.delete("/", deleteAllAsistants);

module.exports = { asistantRouter };
