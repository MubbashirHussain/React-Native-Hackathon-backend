const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    UserName: { type: String, required: true, unique: true },
    Password: { type: String, required: true, minlength: 6 },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Profile: { type: String },
    DateofBirth: { type: Date },
    Gender: { type: String, enum: ["Male", "Female"], required: true },
    Location: { type: String },
    ChatWith: {
      type: [
        {
          ChatId: String,
          _id: mongoose.Types.ObjectId,
          UserName: String,
          Profile: String,
        },
      ],
    },
    Bio: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: "Invalid email address format",
      },
    },
  },
  { timestamps: true }
);
let AuthModle = mongoose.model("User", UserSchema);
module.exports.User = AuthModle;
