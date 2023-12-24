const Route = require("express").Router();
const Control = require("../controller/Auth");
Route.post("/login", Control.Login).post("/signup", Control.Signup);

module.exports = Route;
