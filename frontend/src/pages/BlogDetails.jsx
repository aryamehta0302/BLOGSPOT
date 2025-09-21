import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./BlogDetails.css";

export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Form states for creating new blog
  const [userid] = useState(localStorage.getItem("userid") || "");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [titleImage, setTitleImage] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");

  // Fetch blog details if ID is provided
  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
          setBlog(response.data);
        } catch (err) {
          setError("Blog not found");
          console.error("Error fetching blog:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    } else {
      setLoading(false);
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3000/api/blogs/create", {
        userid,
        title,
        subtitle,
        titleImage,
        body,
      });
      setMessage("Blog created successfully!");
      setTitle("");
      setSubtitle("");
      setTitleImage("");
      setBody("");
    } catch (err) {
      setMessage("Failed to create blog. Please try again.");
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  // If we have an ID, show blog details
  if (id) {
    if (loading) return <div className="blog-details">Loading...</div>;
    if (error) return <div className="blog-details">{error}</div>;
    if (!blog) return <div className="blog-details">Blog not found</div>;

    return (
      <div className="blog-details">
        {blog.titleImage && !imageError && (
          <img 
            src={blog.titleImage} 
            alt={blog.title}
            className="blog-cover-image"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "8px",
              marginBottom: "20px",
              display: imageLoaded ? "block" : "none"
            }}
          />
        )}
        <h1>{blog.title}</h1>
        {blog.subtitle && <h2 className="blog-subtitle">{blog.subtitle}</h2>}
        <p className="blog-meta">
          Published on {new Date(blog.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long", 
            day: "numeric"
          })}
        </p>
        <div className="blog-content">
          {blog.body.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    );
  }

  // Otherwise show create blog form
  return (
    <div className="blog-details">
      <h2>Create a New Blog Post</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Subtitle (optional)"
          value={subtitle}
          onChange={e => setSubtitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title Image URL (optional)"
          value={titleImage}
          onChange={e => setTitleImage(e.target.value)}
        />
        <textarea
          placeholder="Blog Content"
          value={body}
          onChange={e => setBody(e.target.value)}
          rows={8}
          required
        />
        <button type="submit">Create Blog</button>
      </form>
      {message && <p style={{ color: message.includes("success") ? "green" : "red" }}>{message}</p>}
    </div>
  );
}