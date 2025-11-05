import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!email || !password) {
      setMessage("Email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMessage("Login successful! Redirecting...");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card" style={{ maxWidth: "400px" }}>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to continue to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="field-label">Email</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label className="field-label">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-btn"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {message && (
            <div
              className={`auth-message ${
                message.includes("successful") ? "success" : "error"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#2563eb", fontWeight: "500" }}>
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
