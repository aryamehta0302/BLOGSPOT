import { useParams } from "react-router-dom";
import "./BlogDetails.css";

const blogs = [
  { id: 1, title: "The Future of Blogging", author: "Arya", date: "Sep 2, 2025", description: "Full detailed content of The Future of Blogging..." },
  { id: 2, title: "React Best Practices", author: "Mehta", date: "Sep 1, 2025", description: "Full detailed content of React Best Practices..." }
];

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) return <p className="not-found">Blog not found.</p>;

  return (
    <div className="blog-details">
      <h1>{blog.title}</h1>
      <p className="meta">By {blog.author} • {blog.date}</p>
      <p className="content">{blog.description}</p>
    </div>
  );
}