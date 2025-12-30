const express = require("express");
const Progress = require("../models/Progress");

const router = express.Router();
const Problem = require("../models/Problem");

router.post("/save", async (req, res) => {
  const { userId, problemId, done } = req.body;

  await Progress.findOneAndUpdate(
    { userId, problemId },
    { done },
    { upsert: true }
  );

  res.json({ message: "Saved" });
});

router.get("/:userId/:topicId", async (req, res) => {
  const { userId, topicId } = req.params;

  const problems = await Problem.find({ topicId }).select("_id");
  const ids = problems.map((p) => p._id.toString());

  const progress = await Progress.find({
    userId,
    problemId: { $in: ids },
  });

  res.json(progress);
});

module.exports = router;
