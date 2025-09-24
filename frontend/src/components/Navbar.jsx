import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ toggleTheme, theme, onSearch }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    window.location.reload(); // Refresh page to update all components
  };

  const getAvatarEmoji = (gender) => {
    return gender === 'female' ? '👩' : '👨';
  };

  return (
    <nav>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/">
          <h1>Blog Spot</h1>
        </Link>
        
        {/* 🔎 Search Bar */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search blogs..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        {/* Show different options based on authentication status */}
        {isLoggedIn ? (
          <>
            {/* ➕ Add Blog */}
            <Link to="/add-blog" className="btn btn-accent btn-sm">
              ➕ Add Blog
            </Link>

            {/* Navigation Links */}
            <Link to="/" className="btn btn-primary btn-sm">Home</Link>
            <Link to="/bookmarks" className="btn btn-primary btn-sm">Bookmarks</Link>
            <Link to="/profile" className="btn btn-primary btn-sm">Profile</Link>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout}
              className="btn btn-danger btn-sm"
              style={{
                background: "var(--danger)",
                color: "white",
                border: "none"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Guest Navigation */}
            <Link to="/" className="btn btn-primary btn-sm">Home</Link>
            <Link to="/bookmarks" className="btn btn-primary btn-sm">Bookmarks</Link>
            <Link to="/login" className="btn btn-accent btn-sm">Login</Link>
            <Link to="/register" className="btn btn-accent btn-sm">Register</Link>
          </>
        )}

        {/* 🌗 Theme Toggle */}
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
