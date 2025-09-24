import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import unknownMale from "../assets/unknown_male.jpg";
import unknownFemale from "../assets/unknown_female.jpg";
import unknown from "../assets/unknown.jpg";
import "../theme.css";

export default function BlogCard({ id, title, author, date, description, cover, gender, profileImage }) {
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
      saved.push({ id, title, author, date, description, cover, gender, profileImage }); // add
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

  // Get gender-based avatar
  const getAvatarEmoji = (gender) => {
    return gender === 'female' ? '👩' : '👨';
  };

  const getDefaultProfileImage = (gender) => {
    if (gender === 'female') return unknownFemale;
    if (gender === 'male') return unknownMale;
    return unknown;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card blog-card">
      <div className="blog-header">
        <div className="author-info">
          <div className="author-avatar">
            <img 
              src={
                profileImage 
                  ? `http://localhost:3000${profileImage}` 
                  : getDefaultProfileImage(gender)
              } 
              alt={author} 
              className="avatar-img"
            />
          </div>
          <span className="author-name">{author}</span>
        </div>
        <span className="date">{formatDate(date)}</span>
      </div>

      {/* Cover Image */}
      {cover && !imageError && (
        <div className="blog-image">
          <img
            src={cover}
            alt={title}
            className="cover"
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: imageLoaded ? "block" : "none" }}
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="blog-main">
        <h2 className="blog-title">{title}</h2>
        <p className="desc">{description}</p>

        <div className="blog-footer">
          <div className="actions">
            <button
              className="btn-sm upvote"
              onClick={() => setVotes(votes + 1)}
            >
              🔼 {votes}
            </button>
            <button className="btn-sm bookmark-btn" onClick={toggleBookmark}>
              {bookmarked ? "🔖 Saved" : "🔖 Save"}
            </button>
            <Link to={`/blog-details/${id}`} className="btn btn-primary btn-sm">
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
