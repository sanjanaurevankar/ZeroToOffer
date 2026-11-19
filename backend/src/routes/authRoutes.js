const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { authLimiter } = require("../middleware/rateLimiter");
const { validateRegister, validateLogin } = require("../validators/authValidator");
const { registerUser, loginUser, getCurrentUser } = require("../controllers/authController");

const router = express.Router();

router.post("/register", authLimiter, validateRegister, registerUser);
router.post("/login", authLimiter, validateLogin, loginUser);
router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;