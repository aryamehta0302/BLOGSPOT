import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

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
      setError("No blog ID provided");
      setLoading(false);
    }
  }, [id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

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