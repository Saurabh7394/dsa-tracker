const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getStreak } = require("../controllers/problemController");

// Protected route
router.get("/me", auth, (req, res) => {
  res.json({ msg: "Welcome user", userId: req.user });
});
router.get("/streak", auth, getStreak);
module.exports = router;