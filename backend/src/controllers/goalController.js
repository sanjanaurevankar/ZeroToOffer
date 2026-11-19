const Goal = require("../models/Goal");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const createGoal = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    throw new AppError("Goal title is required", 400);
  }
  const goal = await Goal.create({ user: req.user.id, title: title.trim() });
  res.status(201).json(goal);
});

const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id });
  if (!goal) {
    throw new AppError("Goal not found", 404);
  }
  goal.completed = !goal.completed;
  await goal.save();
  res.status(200).json(goal);
});

const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.status(200).json(goals);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findOne({ _id: req.params.id, user: req.user.id });
  if (!goal) {
    throw new AppError("Goal not found", 404);
  }
  await goal.deleteOne();
  res.status(200).json({ message: "Goal deleted successfully" });
});

module.exports = { createGoal, getGoals, updateGoal, deleteGoal };