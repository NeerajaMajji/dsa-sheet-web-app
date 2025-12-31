const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
// public routes (NO token needed)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// auth middleware (everything below needs token)
const authMiddleware = require("./middleware/authMiddleware");

const topicRoutes = require("./routes/topics");
app.use("/api/topics", authMiddleware, topicRoutes);

const problemRoutes = require("./routes/problems");
app.use("/api/problems", authMiddleware, problemRoutes);

const progressRoutes = require("./routes/progress");
app.use("/api/progress", authMiddleware, progressRoutes);

const topicProgressRoutes = require("./routes/topicProgress");
app.use("/api/topic-progress", authMiddleware, topicProgressRoutes);

const userProgressRoutes = require("./routes/userProgress");
app.use("/api/user-progress", authMiddleware, userProgressRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", authMiddleware, userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("DSA Sheet API running ");
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
