import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ id, title, author, date, description, cover }) {
  const [votes, setVotes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Load bookmark state from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(saved.some(b => b.id === id));
  }, [id]);

  const toggleBookmark = () => {
    let saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (bookmarked) {
      saved = saved.filter(b => b.id !== id); // remove
    } else {
      saved.push({ id, title, author, date, description, cover }); // add
    }
    localStorage.setItem("bookmarks", JSON.stringify(saved));
    setBookmarked(!bookmarked);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  return (
    <div className="blog-card">
      <div className="blog-content">
        <div className="author-info">
          <div className="author-avatar">
            <span>{author.charAt(0).toUpperCase()}</span>
          </div>
          <span className="author-name">{author}</span>
        </div>
        
        <div className="blog-main">
          <h2>{title}</h2>
          <p className="desc">{description}</p>
          
          <div className="blog-footer">
            <span className="date">{date}</span>
            <div className="actions">
              <button className="upvote" onClick={() => setVotes(votes + 1)}>🔼 {votes}</button>
              <button className="bookmark-btn" onClick={toggleBookmark}>
                {bookmarked ? "🔖" : "🔖"}
              </button>
              <Link to={`/blog-details/${id}`} className="read-more">Read More →</Link>
            </div>
          </div>
        </div>
      </div>
      
      {cover && !imageError && (
        <div className="blog-image">
          <img 
            src={cover} 
            alt={title} 
            className="cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </div>
      )}
    </div>
  );
}
