import { useState, useEffect } from "react";
import BlogCard from "../components/BlogCard";
import "./Bookmarks.css";

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bookmarks")) || [];
    setBookmarks(saved);
  }, []);

  return (
    <div className="bookmarks">
      <h2>Your Bookmarks</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet. Save some blogs 🔖</p>
      ) : (
        <div className="bookmark-list">
          {bookmarks.map(blog => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>
      )}
    </div>
  );
}
