import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}