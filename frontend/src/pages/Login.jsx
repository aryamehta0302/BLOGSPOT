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

    // Validation
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
      
      // Store user data and token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      setMessage("Login successful! Redirecting...");
      
      // Clear form
      setEmail("");
      setPassword("");
      
      // Redirect to home page after 1 second
      setTimeout(() => {
        navigate('/');
        window.location.reload(); // Refresh to update navbar
      }, 1000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue to your account</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="auth-field">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            className={`auth-message ${
              message.includes("successful") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}

        <p className="auth-footer">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
