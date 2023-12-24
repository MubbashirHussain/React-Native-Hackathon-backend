const Route = require("express").Router();
const Control = require("../controller/File");

Route.post("/", Control.Post)

module.exports = Route;
