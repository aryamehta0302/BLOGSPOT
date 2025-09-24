export default function Login() {
  return (
    <div className="auth-page">
      <div className="card auth-card">
        <h2 className="auth-title">Welcome Back 👋</h2>
        <p className="auth-subtitle">Login to continue to your account</p>

        <form>
          <div className="auth-field">
            <input type="email" placeholder="Email Address" required />
          </div>
          <div className="auth-field">
            <input type="password" placeholder="Password" required />
          </div>

          <button type="submit" className="btn btn-primary auth-btn">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}
