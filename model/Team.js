const { default: mongoose } = require("mongoose");
let TeamSchema = new mongoose.Schema(
  {
    TeamName: { type: String, required: true, unique: true },
    TeamMembers: { type: [], ref: "user" },
    Type: { type: String, enum: ["Public", "Private", "Secert"] },
    TeamLogo: { type: String },
    Profile: { type: String },
    TeamChat: { type: mongoose.Schema.Types.ObjectId },
    CreatorUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

let model = new mongoose.model("Team", TeamSchema);
module.exports = model;
