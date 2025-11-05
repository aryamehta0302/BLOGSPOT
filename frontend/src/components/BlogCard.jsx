import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import unknownMale from "../assets/unknown_male.jpg";
import unknownFemale from "../assets/unknown_female.jpg";
import unknown from "../assets/unknown.jpg";
import "../theme.css";

export default function BlogCard({
  id,
  title,
  author,
  date,
  description,
  cover,
  gender,
  profileImage,
}) {
  const [votes, setVotes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarked(saved.some((b) => b.id === id));
  }, [id]);

  const toggleBookmark = () => {
    let saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    if (bookmarked) {
      saved = saved.filter((b) => b.id !== id);
    } else {
      saved.push({ id, title, author, date, description, cover, gender, profileImage });
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

  const getDefaultProfileImage = (gender) => {
    if (gender === "female") return unknownFemale;
    if (gender === "male") return unknownMale;
    return unknown;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="card blog-card clean-card">
      {/* Header */}
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
          <div>
            <span className="author-name">{author}</span>
            <span className="date subtle-date">{formatDate(date)}</span>
          </div>
        </div>
      </div>

      {/* Cover */}
      {cover && !imageError && (
        <div className="blog-image clean-image">
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

      {/* Content */}
      <div className="blog-main">
        <h2 className="blog-title clean-title">{title}</h2>
        <p className="desc clean-desc">{description}</p>

        <div className="blog-footer clean-footer">
          <div className="actions clean-actions">
            <button
              className="btn-sm flat-btn"
              onClick={() => setVotes(votes + 1)}
              title="Upvote"
            >
              ▲ {votes}
            </button>

            <button
              className={`btn-sm flat-btn ${bookmarked ? "active" : ""}`}
              onClick={toggleBookmark}
              title="Save to bookmarks"
            >
              {bookmarked ? "Saved" : "Save"}
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
