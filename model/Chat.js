const { default: mongoose } = require("mongoose");
let ChatSchema = new mongoose.Schema(
  {
    Users: { type: [{ UserName: String, _id: String, Profile: String }] },
    Messages: {
      type: [{ UserName: String, message: String, time: Number, _id: String }],
    },
  },
  { timestamps: true }
);

let model = new mongoose.model("Chat", ChatSchema);
module.exports = model;
