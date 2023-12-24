const Route = require("express").Router();
const Control = require("../controller/User");

Route.get("/", Control.getAllUser)
  .get("/username", Control.getUserByUserNames)
  .get("/:id", Control.getUserById)
  .patch("/Chat/:id", Control.PushChat)
  .patch("/:id", Control.Patch);

module.exports = Route;
