import type { ReactNode } from "react";
import "../styles/layout.css";
import "../styles/auth.css";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-container">
      <div className="left-section">
        <div>
          <h1>⛓️ ZeroToOffer</h1>
          <p className="tagline">Your complete coding interview preparation platform.</p>
          <div className="features">
            <p>🔺 Track LeetCode Progress</p>
            <p>🔺 Company-wise Questions</p>
            <p>🔺 Daily Coding Streak</p>
            <p>🔺 Performance Analytics</p>
            <p>🔺 Resume Ready Dashboard</p>
          </div>
        </div>
      </div>

      <div className="right-section">
        <div className="form-card">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;