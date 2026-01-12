const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); 

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, 
    },

    phone: {
      type: String,
      minlength: [10, "Phone must be 10 digits"],
      match: [/^[0-9]{10}$/, "Enter valid 10 digit phone"],
      trim: true,
    },
    skills: {
      type: String,
      maxlength: [500, "Skills too long"],
    },

    address: {
      type: String,
      minlength: [10, "Address must be at least 10 characters"],
      trim: true,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("User", userSchema);
