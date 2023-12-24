const { SendResponse } = require("../Helpers/HelperFx");
const Chat = require("../model/Chat");

let TaskControllers = {
  Get: async (req, res) => {
    try {
      let data = await Chat.find();
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "No data Found", { ...err }));
    }
  },
  GetById: async (req, res) => {
    try {
      let data = await Chat.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  CreateChatWithTeam: async (req, res) => {
    try {
      let { Users } = req.body;

      if (Array.isArray(Users)) {
        let Data = await new Chat({ Users: [...Users] }).save();
        console.log(Data._id);
        res
          .status(201)
          .send(
            SendResponse(true, "Data Successfully Added", { ChatId: Data._id })
          );
      } else if (!Array.isArray(Users)) {
        let { Me, To } = Users;
        if (Me && To) {
          let Data = await new Chat({ Users: [{ ...Me }, { ...To }] }).save();
          console.log(Data._id);
          res.status(201).send(
            SendResponse(true, "Data Successfully Added", {
              ChatId: Data._id,
            })
          );
        } else {
          res.status(400).send(
            SendResponse(false, "Please Send Both Data Perfectly", {
              ...Users,
            })
          );
        }
      } else {
        res
          .status(400)
          .send(SendResponse(false, "Not Right Data", { ...req.body }));
      }
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  PushMessage: async (req, res) => {
    try {
      let data = await Chat.updateOne(
        { _id: req.params.id },
        { $push: { Messages: { ...req.body } } },
        { returnDocument: "after" }
      );
      res.status(200).send(SendResponse(true, "Message Send", data));
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
  Patch: async (req, res) => {
    try {
      let data = await Chat.findByIdAndUpdate(
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
  Delete: async (req, res) => {
    try {
      let data = await Chat.findByIdAndDelete(req.params.id);
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

module.exports = TaskControllers;
