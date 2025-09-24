import { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import unknownMale from "../assets/unknown_male.jpg";
import unknownFemale from "../assets/unknown_female.jpg";
import unknown from "../assets/unknown.jpg";
import "../theme.css";

export default function Home({ search = "" }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getDefaultProfileImage = (gender) => {
    if (gender === 'female') return unknownFemale;
    if (gender === 'male') return unknownMale;
    return unknown;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/blogs/");
        const blogsData = response.data.map((blog) => ({
          id: blog._id,
          title: blog.title,
          author: blog.userid ? blog.userid.name : "Anonymous", // Get user name from populated userid
          date: blog.date, // Keep original date for formatting in BlogCard
          description: blog.subtitle || blog.body.substring(0, 150) + "...",
          cover: blog.titleImage || null, // Don't use placeholder image
          gender: blog.userid ? blog.userid.gender : null, // Get gender for avatar
          profileImage: blog.userid ? blog.userid.profileImage : null, // Get profile image
          userId: blog.userid ? blog.userid._id : null, // User ID for future use
        }));
        setBlogs(blogsData);
      } catch (err) {
        setError("Failed to fetch blogs. Please try again later.");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <p>Loading blogs...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container">
        <div className="card">
          <p className="auth-message error">{error}</p>
        </div>
      </div>
    );
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.description.toLowerCase().includes(search.toLowerCase()) ||
      blog.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home">
      {filteredBlogs.length === 0 ? (
        <p className="no-blogs-center">
          {search ? `No blogs found for "${search}".` : "No blogs found."}
        </p>
      ) : (
        filteredBlogs.map((blog) => <BlogCard key={blog.id} {...blog} />)
      )}
    </div>
  );
}
