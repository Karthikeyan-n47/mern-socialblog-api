const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "User must have a username"],
      unique: [true, "Username already taken, please enter a new one"],
    },
    email: {
      type: String,
      required: [true, "User must have a username"],
      unique: [true, "Email address already exists, please enter a new one"],
    },
    password: {
      type: String,
      required: [true, "Account must have a password"],
    },
    profilePic: {
      type: String,
      default:
        "https://socialmedia-mern-stack-s3-upload.s3.ap-south-1.amazonaws.com/uploads/1713266275730-noAvatar.png",
    },
    about: {
      type: String,
      maxLenght: [250, "Content should not exceed 250 characters"],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator, {
  message: "{VALUE} already exists! Please enter a new {VALUE}",
});

module.exports = mongoose.model("User", UserSchema);
