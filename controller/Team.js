const { SendResponse } = require("../Helpers/HelperFx");
const Team = require("../model/Team");

let TeamControllers = {
  Get: async (req, res) => {
    try {
      let data = await Team.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "No data Found", { ...err }));
    }
  },
  GetById: async (req, res) => {
    try {
      let data = await Team.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  GetByCreated: async (req, res) => {
    try {
      let data = await Team.find({ CreatorUserID: req.params.id });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  GetByIn: async (req, res) => {
    try {
      let data = await Team.find({ "TeamMembers._id": req.params.id });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Post: async (req, res) => {
    try {
      let DB = await new Team({ ...req.body }).save();
      res
        .status(201)
        .send(SendResponse(true, "Data Successfully Added", { ...DB._doc }));
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Patch: async (req, res) => {
    try {
      let data = await Team.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { returnDocument: "after" }
      );
      res
        .status(200)
        .send(
          SendResponse(true, "Data Successfully Updated", { ...data._doc })
        );
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Put: async (req, res) => {
    try {
      let data = await Team.findOneAndReplace(
        { _id: req.params.id },
        { ...req.body },
        { returnDocument: "after" }
      );
      res
        .status(200)
        .send(
          SendResponse(true, "Data Successfully Replaced", { ...data._doc })
        );
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Delete: async (req, res) => {
    try {
      let data = await Team.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .send(
          SendResponse(true, "Data successfully Deleted", { ...data._doc })
        );
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = TeamControllers;
