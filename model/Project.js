const { default: mongoose } = require("mongoose");

let ProjectSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true , unique:true},
    Description: { type: String },
    EndDate: { type: Date },
    StartDate: { type: Date },
    CreatorUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

let model = new mongoose.model("Project", ProjectSchema);
module.exports = model;
