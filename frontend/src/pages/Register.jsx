import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!gender) {
      setMessage("Please select a gender.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/api/users/create", {
        name,
        email,
        password,
        gender,
      });
      setMessage("Registration successful!");
      setName("");
      setEmail("");
      setPassword("");
      setGender("");
    } catch (err) {
      console.log(err);
      setMessage("Registration failed. Try again.");
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

          {/* Gender Selection */}
          <div className="auth-field gender-section">
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={() => setGender("male")}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={() => setGender("female")}
              />
              Female
            </label>
          </div>

          <button type="submit" className="btn btn-accent auth-btn">
            Register
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "1rem",
              color: message.includes("success") ? "limegreen" : "red",
            }}
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
