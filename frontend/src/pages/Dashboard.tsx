import { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import { getGoals, createGoal, updateGoal, deleteGoal } from "../services/goalService";
import { getDashboardStats } from "../services/progressService";
import { FiCheckCircle, FiTrendingUp, FiRepeat, FiBriefcase } from "react-icons/fi";

interface DashboardStats {
  questionsSolved: number;
  currentStreak: number;
  revisionCount: number;
  companiesCovered: number;
}

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [goals, setGoals] = useState<any[]>([]);
  const [newGoal, setNewGoal] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    questionsSolved: 0,
    currentStreak: 0,
    revisionCount: 0,
    companiesCovered: 0,
  });

  const handleAddGoal = async () => {
    if (!newGoal.trim()) return;
    try {
      await createGoal({ title: newGoal });
      setNewGoal("");
      const response = await getGoals();
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleGoal = async (id: string) => {
    try {
      await updateGoal(id);
      const response = await getGoals();
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteGoal = async (id: string) => {
    try {
      await deleteGoal(id);
      const response = await getGoals();
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchGoals = async () => {
      try {
        const response = await getGoals();
        setGoals(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
    fetchGoals();
    fetchStats();
  }, []);

  return (
    <Layout>
      <h1>ZeroToOffer Dashboard</h1>
      <hr />

      <h2>Welcome {user?.name}</h2>
      <p>{user?.email}</p>

      <div>
        <input
          type="text"
          placeholder="Enter New Goal"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
        />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>

      <h2>Today's Goals</h2>
      {goals.map((goal: any) => (
        <div
          key={goal._id}
          style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}
        >
          <input
            type="checkbox"
            checked={goal.completed}
            onChange={() => handleToggleGoal(goal._id)}
          />
          <span style={{ flex: 1, textDecoration: goal.completed ? "line-through" : "none" }}>
            {goal.title}
          </span>
          <button onClick={() => handleDeleteGoal(goal._id)}>🗑</button>
        </div>
      ))}

    <div className="dashboard-cards">
        <DashboardCard title="Questions Solved" value={stats.questionsSolved} icon={<FiCheckCircle />} accent="green" />
        <DashboardCard title="Current Streak" value={stats.currentStreak} icon={<FiTrendingUp />} accent="orange" />
        <DashboardCard title="Revision Count" value={stats.revisionCount} icon={<FiRepeat />} accent="blue" />
        <DashboardCard title="Companies Covered" value={stats.companiesCovered} icon={<FiBriefcase />} accent="purple" />
    </div>
    </Layout>
  );
};

export default Dashboard;