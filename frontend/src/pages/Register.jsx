import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Register.css";

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
      // Change the URL if your backend runs on a different port
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
      <div className="auth-card">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <div className="gender-section">
            <label style={{marginRight: '10px'}}>
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
          <button type="submit">Register</button>
        </form>
        {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}