import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import "./Home.css";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs/");
        const blogsData = response.data.map(blog => ({
          id: blog._id,
          title: blog.title,
          author: "Anonymous", // You can populate this with user data if needed
          date: new Date(blog.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
          }),
          description: blog.subtitle || blog.body.substring(0, 100) + "...",
          cover: blog.titleImage || "https://source.unsplash.com/600x400/?blog,writing"
        }));
        setBlogs(blogsData);
      } catch (err) {
        setError("Failed to fetch blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="home">Loading blogs...</div>;
  if (error) return <div className="home">{error}</div>;

  return (
    <div className="home">
      {blogs.length === 0 ? (
        <p>No blogs available.</p>
      ) : (
        blogs.map(blog => (
          <BlogCard key={blog.id} {...blog} />
        ))
      )}
    </div>
  );
}