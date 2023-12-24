const Route = require("express").Router();
const Control = require("../controller/Project");

Route.get("/", Control.Get)
  .get("/:id", Control.GetById)
  .post("/", Control.Post)
  .patch("/:id", Control.Patch)
  .put("/:id", Control.Put)
  .delete("/:id", Control.Delete);

module.exports = Route;
