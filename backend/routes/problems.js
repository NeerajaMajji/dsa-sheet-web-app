const express = require("express");
const Problem = require("../models/Problem");

const router = express.Router();

router.get("/:topicId", async (req, res) => {
  const { topicId } = req.params;
  const problems = await Problem.find({ topicId });
  res.json(problems);
});

module.exports = router;
