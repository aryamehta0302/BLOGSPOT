import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddBlog() {
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    body: "",
    titleImage: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("http://localhost:3000/api/blogs/create", form);
      setMessage("✅ Blog created successfully!");
      setTimeout(() => navigate("/"), 1200); // Redirect after success
    } catch (err) {
      console.error("Error creating blog:", err);
      setMessage("❌ Failed to create blog.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "650px", margin: "2rem auto" }}>
      <h2 className="auth-title">➕ Add a New Blog</h2>
      <p className="auth-subtitle">Share your thoughts with the world 🌍</p>

      <form onSubmit={handleSubmit}>
        <div className="auth-field">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="auth-field">
          <input
            type="text"
            name="subtitle"
            placeholder="Subtitle (optional)"
            value={form.subtitle}
            onChange={handleChange}
          />
        </div>
        <div className="auth-field">
          <textarea
            name="body"
            placeholder="Write your blog content here..."
            value={form.body}
            onChange={handleChange}
            required
          />
        </div>
        <div className="auth-field">
          <input
            type="url"
            name="titleImage"
            placeholder="Cover Image URL (optional)"
            value={form.titleImage}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-accent auth-btn">
          Publish Blog 🚀
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "1rem",
            color: message.includes("✅") ? "limegreen" : "red",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
