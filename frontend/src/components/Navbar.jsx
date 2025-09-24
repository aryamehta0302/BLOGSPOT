export default function Navbar({ toggleTheme, theme, onSearch }) {
  return (
    <nav>
      <h1>My Blog</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
        {/* 🔎 Search Bar */}
        <div className="nav-search">
          <input
            type="text"
            placeholder="Search blogs..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* ➕ Add Blog */}
        <a href="/add-blog" className="btn btn-accent btn-sm">
          ➕ Add Blog
        </a>

        {/* Links */}
        <a href="/" className="btn btn-primary btn-sm">Home</a>
        <a href="/bookmarks" className="btn btn-primary btn-sm">Bookmarks</a>
        <a href="/profile" className="btn btn-primary btn-sm">Profile</a>
        <a href="/login" className="btn btn-accent btn-sm">Login</a>
        <a href="/register" className="btn btn-accent btn-sm">Register</a>

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
