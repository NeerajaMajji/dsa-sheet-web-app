const router = require("express").Router();
const Progress = require("../models/Progress");
const Problem = require("../models/Problem");

// SECURED: always uses req.user.id
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id;

    const totalEasy = await Problem.countDocuments({ difficulty: /easy/i });
    const totalMedium = await Problem.countDocuments({ difficulty: /medium/i });
    const totalHard = await Problem.countDocuments({ difficulty: /hard/i });

    const total = totalEasy + totalMedium + totalHard;

    const solved = await Progress.find({ userId, done: true }).select(
      "problemId"
    );
    const ids = solved.map((s) => s.problemId);

    const easyDone = await Problem.countDocuments({
      _id: { $in: ids },
      difficulty: /easy/i,
    });
    const mediumDone = await Problem.countDocuments({
      _id: { $in: ids },
      difficulty: /medium/i,
    });
    const hardDone = await Problem.countDocuments({
      _id: { $in: ids },
      difficulty: /hard/i,
    });

    res.json({
      total,
      done: ids.length,
      totalEasy,
      totalMedium,
      totalHard,
      easyDone,
      mediumDone,
      hardDone,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error loading progress" });
  }
});

module.exports = router;
