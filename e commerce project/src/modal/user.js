const mongoose = require("mongoose");
const validator = require("validator");

const userschema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    lastname: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("enter a proper value");
        }
      },
    },
    password: {
      type: String,
      trim: true,

      required: true,

      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("enter a proper value");
        }
      },
    },
  },
  {
    timestamp: true,
  }
);

const user = mongoose.model("usera", userschema);
module.exports = { user };
