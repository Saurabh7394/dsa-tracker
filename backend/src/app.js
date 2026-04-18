const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); // ✅ IMPORTANT
const userRoutes = require("./routes/userRoutes");
const problemRoutes = require("./routes/problemRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ THIS LINE IS CRITICAL
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/problems", problemRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;