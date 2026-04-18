const Problem = require("../models/Problem");
const User = require("../models/User"); 
// Add problem
exports.addProblem = async (req, res) => {
  try {
    const problem = await Problem.create({
      ...req.body,
      user: req.user,
    });

    // 🔥 STREAK LOGIC
    if (req.body.status === "Solved") {
      const user = await User.findById(req.user);

      const today = new Date();
      const last = user.lastSolvedDate;

      if (last) {
        const diff =
          (new Date(today).setHours(0,0,0,0) -
           new Date(last).setHours(0,0,0,0)) /
          (1000 * 60 * 60 * 24);

        if (diff === 1) {
          user.streak += 1;
        } else if (diff > 1) {
          user.streak = 1;
        }
      } else {
        user.streak = 1;
      }

      user.lastSolvedDate = new Date();
      await user.save();
    }

    res.json(problem);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all problems of user
exports.getProblems = async (req, res) => {
  try {
    const problems = await Problem.find({ user: req.user });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const stats = await Problem.aggregate([
      { $match: { user: req.user } },
      {
        $group: {
          _id: "$difficulty",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.json({ streak: user.streak });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};