import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.endsWith('@gmail.com');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Validation
    if (!name || !email || !password || !gender) {
      setMessage("All fields are required.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setMessage("Please use a valid @gmail.com email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/users/register", {
        name,
        email,
        password,
        gender,
      });
      
      // Store user data and token
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      setMessage("Registration successful! Redirecting to login...");
      
      // Clear form
      setName("");
      setEmail("");
      setPassword("");
      setGender("");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2 className="auth-title">Create an Account 🚀</h2>
        <p className="auth-subtitle">Join us and start your journey today</p>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <input
              type="email"
              placeholder="Email Address (@gmail.com only)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-field">
            <input
              type="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Enhanced Gender Selection */}
          <div className="auth-field">
            <label className="field-label">Gender</label>
            <div className="gender-options">
              <label className={`gender-option ${gender === "male" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                <span className="gender-text">👨 Male</span>
              </label>
              <label className={`gender-option ${gender === "female" ? "selected" : ""}`}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                <span className="gender-text">👩 Female</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-accent auth-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
