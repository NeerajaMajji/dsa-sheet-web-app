const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  title: String,
  difficulty: String,
  youtubeLink: String,
  leetcodeLink: String,
  articleLink: String,
});

module.exports = mongoose.model("Problem", problemSchema);
