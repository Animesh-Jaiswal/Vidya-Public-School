const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: ["Name Field is Mendatory"]
  },
  username: {
    type: String,
    unique: true,
    required: ["Username Field is Mendatory"]
  },
  email: {
    type: String,
    unique: true,
    required: ["Email Field is Mendatory"]
  },
  phone: {
    type: String,
    required: ["Phone Field is Mendatory"]
  },
  password: {
    type: String,
    required: ["Password Field is Mendatory"]
  },
  passwordReset: {
    type: Object
  },
  role: {
    type: String,
    default: "Admin"
  },

  active: {
    type: Boolean,
    default: true
  }
}, { timestamps: true })

const User = new mongoose.model("User", UserSchema)

module.exports = User