const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const questionRoutes = require("./routes/questionRoutes");
const progressRoutes = require("./routes/progressRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

app.use(helmet());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",");
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/progress", progressRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;