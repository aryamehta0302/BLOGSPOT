import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats">
        <div className="stat-box">
          <h3>Total Users</h3>
          <p>0</p>
        </div>
        <div className="stat-box">
          <h3>Total Blogs</h3>
          <p>0</p>
        </div>
      </div>
    </div>
  );
}