const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { toggleSolved, getUserProgress, getDashboardStats } = require("../controllers/progressController");

const router = express.Router();

router.get("/", authMiddleware, getUserProgress);
router.get("/stats", authMiddleware, getDashboardStats);
router.put("/:questionId", authMiddleware, toggleSolved);

module.exports = router;