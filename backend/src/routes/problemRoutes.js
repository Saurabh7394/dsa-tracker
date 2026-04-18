const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { addProblem, getProblems, getStats } = require("../controllers/problemController");


router.post("/", auth, addProblem);
router.get("/", auth, getProblems);
router.get("/stats", auth, getStats);


module.exports = router;