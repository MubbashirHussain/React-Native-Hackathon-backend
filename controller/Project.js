const { SendResponse } = require("../Helpers/HelperFx");
const Project = require("../model/Project");

let ProjectControllers = {
  Get: async (req, res) => {
    try {
      let data = await Project.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "No data Found", { ...err }));
    }
  },
  GetById: async (req, res) => {
    try {
      let data = await Project.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Post: async (req, res) => {
    try {
      let DB = await new Project({ ...req.body }).save();
      res
        .status(201)
        .send(SendResponse(true, "Data Successfully Added", { ...DB._doc }));
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Patch: async (req, res) => {
    try {
      let data = await Project.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { returnDocument: "after" }
      );
      res
        .status(200)
        .send(SendResponse(true, "Data Successfully Updated", { ...data._doc }));
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Put: async (req, res) => {
    try {
      let data = await Project.findOneAndReplace(
        { _id: req.params.id },
        { ...req.body },
        { returnDocument: "after" }
      );
      res.status(200).send(SendResponse(true, "Data Successfully Replaced", { ...data._doc }));
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Delete: async (req, res) => {
    try {
      let data = await Project.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .send(SendResponse(true, "Data successfully Deleted", { ...data._doc }));
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = ProjectControllers;
