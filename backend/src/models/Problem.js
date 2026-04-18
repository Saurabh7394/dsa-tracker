const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
  },
  status: {
    type: String,
    enum: ["Solved", "Unsolved"],
    default: "Unsolved",
  },
  topic: String,
}, { timestamps: true });

module.exports = mongoose.model("Problem", problemSchema);