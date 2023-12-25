const { SendResponse } = require("../Helpers/HelperFx");
const { User } = require("../model/Auth");

const AuthControllers = {
  getAllUser: async (req, res) => {
    try {
      let { UserCount, UserName } = req.query;
      if (UserCount) {
        let data = await User.find().limit(+UserCount);
        res.send(data);
      } else if (UserName) {
        let name = new RegExp("^" + UserName.toLowerCase(), "i");
        let data = await User.findOne({ UserName: name });
        res.send(data);
      } else {
        let data = await User.find();
        res.send(data);
      }
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", err));
    }
  },
  getUserById: async (req, res) => {
    try {
      let data = await User.findById(req.params.id);
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", err));
    }
  },
  getUserByUserNames: async (req, res) => {
    try {
      let IDs = req.body?.UserNames.map((x) => x._id);
      if (!IDs)
        return res.status(400).send(SendResponse(false, "ID's Not Found", IDs));
      let data = await User.find({ _id: IDs });
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", err));
    }
  },
  Patch: async (req, res) => {
    try {
      let data = await User.findByIdAndUpdate(
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
  PushChat: async (req, res) => {
    try {
      let data = await User.updateOne(
        { _id: req.params.id },
        { $push: { ChatWith: { ...req.body } } },
        { returnDocument: "after" }
      );
      res.status(200).send(SendResponse(true, "Message Send", data));
    } catch (err) {
      res.status(400).send(SendResponse(false, "Unkown Error", { ...err }));
    }
  },
};

module.exports = AuthControllers;
