const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  problemId: { type: String, required: true },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model("Progress", progressSchema);
