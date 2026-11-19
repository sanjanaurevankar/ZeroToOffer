const AppError = require("../utils/AppError");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    return next(new AppError("Name is required", 400));
  }
  if (!email || !EMAIL_REGEX.test(email)) {
    return next(new AppError("A valid email is required", 400));
  }
  if (!password || password.length < 6) {
    return next(new AppError("Password must be at least 6 characters", 400));
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !EMAIL_REGEX.test(email)) {
    return next(new AppError("A valid email is required", 400));
  }
  if (!password) {
    return next(new AppError("Password is required", 400));
  }
  next();
};

module.exports = { validateRegister, validateLogin };