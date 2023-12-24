const { default: mongoose } = require("mongoose");
let TaskSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true, unique: true },
    Description: { type: String },
    StartTime: { type: Date },
    DueDate: { type: Date },
    Priority: { type: String, enum: ["Runing", "Urgent", "Ongoing"] },
    AssignTo: {
      type: [{ UserName: String, _id: String, Status: String , Profile : String}],
    },
    CreatorUserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Status: {
      type: String,
      default: "Todo",
      enum: ["Completed", "inProgress", "Todo"],
    },
  },
  { timestamps: true }
);

let model = new mongoose.model("Task", TaskSchema);
module.exports = model;
