import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

export default function BlogCard({ id, title, author, date, description, cover }) {
  const [votes, setVotes] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);

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

  return (
    <div className="blog-card">
      {cover && <img src={cover} alt={title} className="cover" />}
      <div className="content">
        <h2>{title}</h2>
        <p className="meta">By {author} • {date}</p>
        <p className="desc">{description}</p>

        <div className="actions">
          <button className="upvote" onClick={() => setVotes(votes + 1)}>🔼 {votes}</button>
          <button className="bookmark-btn" onClick={toggleBookmark}>
            {bookmarked ? "🔖 Saved" : "🔖 Bookmark"}
          </button>
          <Link to={`/blog/${id}`} className="read-more">Read More →</Link>
        </div>
      </div>
    </div>
  );
}
