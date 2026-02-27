const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: false },  // MUST BE TRUE FOR PRODUCTION
  isVerified: { type: Boolean, default: false },
  verificationCode: String,
  verificationCodeExpires: Date
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);