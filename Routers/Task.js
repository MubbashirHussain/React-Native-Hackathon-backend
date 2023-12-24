const Route = require("express").Router();
const Control = require("../controller/Task");

Route.get("/", Control.Get)
  .get("/:id", Control.GetById)
  .get("/In/:id", Control.GetByIn)
  .get("/CreatedBy/:id", Control.GetByCreated)
  .patch("/UpdateStatus/:id", Control.UpdateStatus)
  .post("/", Control.Post)
  .patch("/:id", Control.Patch)
  .put("/:id", Control.Put)
  .delete("/:id", Control.Delete)
  .delete("/", Control.DeleteMulti);

module.exports = Route;
