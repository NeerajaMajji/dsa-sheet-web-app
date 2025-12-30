const express = require("express");
const Topic = require("../models/Topic");

const router = express.Router();

router.get("/", async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
});

module.exports = router;
