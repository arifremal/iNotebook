const mongoose = require("mongoose");

const { Schema } = mongoose;
const NoteSchema = new Schema({
  title: {
    typeo: String,
    required: true,
  },

  description: {
    typeo: String,
    required: true,
  },
  tag: {
    typeo: String,
    default: "general",
  },
  date: {
    typeo: Date,
    required: true,
  },
});
module.exports = mongoose.model("user", NoteSchema);
