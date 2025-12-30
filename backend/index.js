const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const topicRoutes = require("./routes/topics");
app.use("/api/topics", topicRoutes);

const problemRoutes = require("./routes/problems");
app.use("/api/problems", problemRoutes);

const progressRoutes = require("./routes/progress");
app.use("/api/progress", progressRoutes);

const topicProgressRoutes = require("./routes/topicProgress");
app.use("/api/topic-progress", topicProgressRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("DSA Sheet API running 🚀");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port", process.env.PORT || 5000)
    );
  })
  .catch((err) => console.log(err));
