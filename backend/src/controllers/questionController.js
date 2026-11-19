const Question = require("../models/Question");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find({
    $or: [{ user: null }, { user: req.user.id }],
  }).sort({ createdAt: 1 });
  res.status(200).json(questions);
});

const createQuestion = asyncHandler(async (req, res) => {
  const { title, difficulty, topic, platform, pattern, company, notes, link } = req.body;

  if (!title || !title.trim()) {
    throw new AppError("Title is required", 400);
  }

  if (!difficulty || !["Easy", "Medium", "Hard"].includes(difficulty)) {
    throw new AppError("Difficulty must be Easy, Medium, or Hard", 400);
  }

  if (!topic || !topic.trim()) {
    throw new AppError("Topic is required", 400);
  }

  const question = await Question.create({
    user: req.user.id,
    title: title.trim(),
    difficulty,
    topic: topic.trim(),
    platform,
    pattern,
    company,
    notes,
    link,
  });

  res.status(201).json(question);
});

module.exports = { getQuestions };