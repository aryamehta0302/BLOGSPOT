import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [titleImage, setTitleImage] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      setMessage("Please login to create a blog post.");
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  useEffect(() => {
    if (titleImage && isValidUrl(titleImage)) {
      setPreviewImage(titleImage);
    } else {
      setPreviewImage("");
    }
  }, [titleImage]);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Validation
    if (!title.trim()) {
      setMessage("Please enter a blog title.");
      setLoading(false);
      return;
    }
    
    if (!body.trim()) {
      setMessage("Please write some content for your blog.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setMessage("Please login to create a blog post.");
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const blogData = {
        title: title.trim(),
        titleImage: titleImage.trim(),
        body: body.trim()
      };

      const res = await axios.post(
        "http://localhost:3000/api/blogs/create", 
        blogData,
        config
      );
      
      setMessage("✅ Blog published successfully! Redirecting...");
      
      // Clear form
      setTitle("");
      setTitleImage("");
      setBody("");
      
      // Redirect to home page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to publish blog. Please try again.";
      setMessage(errorMessage);
      
      // If token is invalid, redirect to login
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="card">
          <div className="loading-state">
            <h2>🔐 Authentication Required</h2>
            <p>Please login to create and publish blog posts.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container add-blog-container">
      <div className="card blog-form-card">
        {/* Header Section */}
        <div className="blog-form-header">
          <div className="header-icon">✍️</div>
          <div>
            <h1 className="form-title">Create New Blog Post</h1>
            <p className="form-subtitle">Share your thoughts with the world, {user.name}!</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="enhanced-blog-form">
          {/* Title Section */}
          <div className="form-section">
            <label className="form-label">📝 Blog Title *</label>
            <input 
              type="text" 
              placeholder="Enter an engaging title for your blog post..." 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="form-input title-input"
              required 
            />
          </div>
          
          {/* Cover Image Section */}
          <div className="form-section">
            <label className="form-label">🖼️ Cover Image URL (Optional)</label>
            <input 
              type="url" 
              placeholder="https://example.com/your-image.jpg" 
              value={titleImage}
              onChange={e => setTitleImage(e.target.value)}
              className="form-input"
            />
            {previewImage && (
              <div className="image-preview">
                <img src={previewImage} alt="Cover preview" className="preview-img" />
              </div>
            )}
          </div>
          
          {/* Content Section */}
          <div className="form-section">
            <label className="form-label">📖 Blog Content *</label>
            <textarea 
              placeholder="Start writing your amazing blog post here..." 
              rows="10" 
              value={body}
              onChange={e => setBody(e.target.value)}
              className="form-textarea content-textarea"
              required
            ></textarea>
          </div>
          
          {/* Action Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              onClick={() => navigate('/')}
              className="btn btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary publish-btn" 
              disabled={loading || !title.trim() || !body.trim()}
            >
              {loading ? (
                <>
                  <div className="loading-spinner small"></div>
                  Publishing...
                </>
              ) : (
                <>
                  🚀 Publish Blog
                </>
              )}
            </button>
          </div>
        </form>

        {/* Message Display */}
        {message && (
          <div className={`message-display ${
            message.includes("successfully") || message.includes("✅") ? "success" : "error"
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
