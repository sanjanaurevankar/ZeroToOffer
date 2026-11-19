import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { loginUser } from "../services/authService";
import AuthLayout from "../components/AuthLayout";
import { TOKEN_KEY } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const response = await loginUser(formData);
      localStorage.setItem(TOKEN_KEY, response.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <h2>Welcome Back</h2>
      {error && <p className="auth-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <FaEnvelope className="input-icon" />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="input-container password-container">
          <FaLock className="input-icon" />
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        </div>
        <button type="submit" disabled={submitting}>{submitting ? "Logging in..." : "Login"}</button>
      </form>
      <p>Don't have an account? <Link to="/register" className="link">Register</Link></p>
    </AuthLayout>
  );
};

export default Login;