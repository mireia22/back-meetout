const express = require("express");
const { authRouter } = require("./auth-routes");
const { userRouter } = require("./user-routes");
const { eventRouter } = require("./event-routes");
const { asistantRouter } = require("./asistant-routes");

const mainRouter = express.Router();
mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/asistants", asistantRouter);
mainRouter.use("/events", eventRouter);
module.exports = { mainRouter };
