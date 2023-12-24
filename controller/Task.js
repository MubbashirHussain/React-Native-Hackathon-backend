const { SendResponse } = require("../Helpers/HelperFx");
const Task = require("../model/Task");

let TaskControllers = {
  Get: async (req, res) => {
    try {
      let data = await Task.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "No data Found", { ...err }));
    }
  },
  GetById: async (req, res) => {
    try {
      let data = await Task.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  GetByCreated: async (req, res) => {
    try {
      let data = await Task.find({ CreatorUserID: req.params.id });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Post: async (req, res) => {
    try {
      let DB = await new Task({ ...req.body }).save();
      res
        .status(201)
        .send(SendResponse(true, "Data Successfully Added", { ...DB._doc }));
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Patch: async (req, res) => {
    try {
      let data = await Task.findByIdAndUpdate(
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
  GetByIn: async (req, res) => {
    try {
      let data = await Task.find({ "AssignTo._id": req.params.id });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  UpdateStatus: async (req, res) => {
    try {
      let { UserId } = req.query;
      let data = await Task.findOne({ _id: req.params.id });
      data.AssignTo = data.AssignTo?.map((x) => {
        if (x._id == UserId) {
          let NewObj = { ...x._doc, ...req.body };
          return NewObj;
        }
        return x;
      });
      let Res = await data.save();
      res
        .status(200)
        .send(SendResponse(true, "Data Successfully Updated", Res));
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Put: async (req, res) => {
    try {
      let data = await Task.findOneAndReplace(
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
      let data = await Task.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .send(
          SendResponse(true, "Data successfully Deleted", { ...data._doc })
        );
    } catch (err) {
      res.send(err);
    }
  },
  DeleteMulti: async (req, res) => {
    try {
      let { DeletedTeamTask } = req.query;
      if (DeletedTeamTask) {
        let data = await Task.deleteMany({ CreatorUserID: DeletedTeamTask });
        res
          .status(200)
          .send(
            SendResponse(true, "Multi Data successfully Deleted", {
              ...data._doc,
            })
          );
      }
    } catch (err) {
      res.send(err);
    }
  },
};

module.exports = TaskControllers;