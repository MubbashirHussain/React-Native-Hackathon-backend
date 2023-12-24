const Route = require("express").Router();
const Control = require("../controller/Team");

Route.get("/", Control.Get)
  .get("/CreatedBy/:id", Control.GetByCreated)
  .get("/In/:id", Control.GetByIn)
  .get("/:id", Control.GetById)
  .post("/", Control.Post)
  .patch("/:id", Control.Patch)
  .put("/:id", Control.Put)
  .delete("/:id", Control.Delete);

module.exports = Route;
