import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ toggleTheme, theme, onSearch }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload();
  };

  const getAvatarEmoji = (gender) => (gender === "female" ? "👩" : "👨");

  return (
    <nav className="navbar-clean">
      {/* Left: Logo + Search */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          Blog<span>Spot</span>
        </Link>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Search blogs..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Right: Buttons + Theme + Avatar */}
      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <Link to="/add-blog" className="nav-btn">Add Blog</Link>
            <Link to="/" className="nav-btn">Home</Link>
            <Link to="/bookmarks" className="nav-btn">Bookmarks</Link>
            <Link to="/profile" className="nav-btn">Profile</Link>

            <button onClick={handleLogout} className="nav-btn danger">
              Logout
            </button>

            <div className="nav-avatar" title={user?.username}>
              {getAvatarEmoji(user?.gender)}
            </div>
          </>
        ) : (
          <>
            <Link to="/" className="nav-btn">Home</Link>
            <Link to="/bookmarks" className="nav-btn">Bookmarks</Link>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        )}

        <label className="theme-toggle">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "light"}
          />
          <span className="theme-slider"></span>
        </label>
      </div>
    </nav>
  );
}
