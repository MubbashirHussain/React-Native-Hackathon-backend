require("dotenv").config();
const express = require("express");
const App = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const fileUpload = require("express-fileupload");
const TaskRoute = require("./Routers/Task");
const ProjectRoute = require("./Routers/Project");
const TeamRoute = require("./Routers/Team");
const ChatRoute = require("./Routers/Chat");
const AuthRoute = require("./Routers/Auth");
const FileRoute = require("./Routers/File");
const UserRoute = require("./Routers/User");

const { ProtectByAuth } = require("./controller/Auth");

App.get("/favicon.ico", (req, res) => res.status(204));
App.use(express.static(path.resolve(__dirname, "public")));
App.use("*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

App.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
App.use(cors());
App.use(express.json());
App.use("/api/project", ProtectByAuth, ProjectRoute);
App.use("/api/UploadFile", FileRoute);
App.use("/api/Chat", ProtectByAuth, ChatRoute);
App.use("/api/task", ProtectByAuth, TaskRoute);
App.use("/api/team", ProtectByAuth, TeamRoute);
App.use("/api/user", ProtectByAuth, UserRoute);
App.use("/api/auth", AuthRoute);

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MongoDB);
  console.log("Data Base connected");
}

App.listen(process.env.PORT, () => {
  console.log("Server is Started " + process.env.PORT);
});
