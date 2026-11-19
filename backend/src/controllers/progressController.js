const UserProgress = require("../models/UserProgress");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/progress - all progress records for the logged-in user
const getUserProgress = asyncHandler(async (req, res) => {
  const progress = await UserProgress.find({ user: req.user.id });
  res.status(200).json(progress);
});

// GET /api/progress/stats - aggregated numbers for the Dashboard cards
const getDashboardStats = asyncHandler(async (req, res) => {
  const solvedRecords = await UserProgress.find({
    user: req.user.id,
    solved: true,
  }).populate("question", "company");

  const questionsSolved = solvedRecords.length;

  const revisionCount = solvedRecords.reduce(
    (sum, record) => sum + (record.revisionCount || 0),
    0
  );

  // Unique companies among the questions this user has actually solved.
  const companySet = new Set(
    solvedRecords.map((record) => record.question?.company).filter(Boolean)
  );
  const companiesCovered = companySet.size;

  // Streak: consecutive days (ending today, or yesterday if nothing solved
  // yet today) that have at least one solve.
  const solveDates = new Set(
    solvedRecords
      .filter((record) => record.lastSolvedAt)
      .map((record) => new Date(record.lastSolvedAt).toISOString().slice(0, 10))
  );

  let currentStreak = 0;
  const cursor = new Date();

  if (!solveDates.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (solveDates.has(cursor.toISOString().slice(0, 10))) {
    currentStreak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  res.status(200).json({
    questionsSolved,
    revisionCount,
    currentStreak,
    companiesCovered,
  });
});

const toggleSolved = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  let progress = await UserProgress.findOne({
    user: req.user.id,
    question: questionId,
  });

  if (!progress) {
    progress = await UserProgress.create({
      user: req.user.id,
      question: questionId,
      solved: true,
      lastSolvedAt: new Date(),
    });
  } else {
    progress.solved = !progress.solved;
    if (progress.solved) {
      progress.revisionCount += 1;
      progress.lastSolvedAt = new Date();
    }
    await progress.save();
  }
  res.status(200).json(progress);
});

module.exports = { getUserProgress, getDashboardStats, toggleSolved };