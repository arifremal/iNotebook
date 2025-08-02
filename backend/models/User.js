const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,  // Changed from 'typeo' to 'type'
    required: true,
  },
  email: {
    type: String,  // Changed from 'typeo' to 'type'
    required: true,
    unique: true,
  },
  password: {
    type: String,  // Changed from 'typeo' to 'type'
    required: true,
    unique:true
  },
  date: {
    type: Date,   // Changed from 'typeo' to 'type'
    default: Date.now,  // Better to use default instead of required for dates
  },
});

module.exports = mongoose.model("user", UserSchema);