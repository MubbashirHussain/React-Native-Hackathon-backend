const Route = require("express").Router();
const Control = require("../controller/Chat");

Route.get("/", Control.Get)
  .get("/:id", Control.GetById)
  .post("/CreateChat", Control.CreateChatWithTeam)
  .patch("/message/:id", Control.PushMessage)
  .delete("/:id", Control.Delete);

module.exports = Route;
