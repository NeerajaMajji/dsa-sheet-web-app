const express = require("express");
const Problem = require("../models/Problem");
const Progress = require("../models/Progress");

const router = express.Router();

router.get("/:userId/:topicId", async (req, res) => {
  const { userId, topicId } = req.params;

  const total = await Problem.countDocuments({ topicId });

  const done = await Progress.countDocuments({
    userId,
    done: true,
    problemId: {
      $in: (
        await Problem.find({ topicId }).select("_id")
      ).map((p) => p._id.toString()),
    },
  });

  res.json({ total, done });
});

module.exports = router;
