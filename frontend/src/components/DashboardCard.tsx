import type { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  accent?: "green" | "orange" | "blue" | "purple";
}

const DashboardCard = ({ title, value, icon, accent = "blue" }: DashboardCardProps) => {
  return (
    <div className="dashboard-card">
      <div className={`card-icon card-icon-${accent}`}>{icon}</div>

      <div className="card-content">
        <h3>{title}</h3>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default DashboardCard;