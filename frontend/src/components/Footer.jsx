import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Blog Spot. All rights reserved.</p>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/bookmarks">Bookmarks</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </footer>
  );
}