import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ toggleTheme }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">Blog Spot</Link>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
        <div className="theme-toggle" onClick={toggleTheme}></div>
      </div>
    </nav>
  );
}
