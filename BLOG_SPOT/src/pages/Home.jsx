import BlogCard from "../components/BlogCard";
import "./Home.css";

const blogs = [
  { id: 1, title: "The Future of Blogging", author: "Arya", date: "Sep 2, 2025", description: "Exploring the evolution of blogs in the era of AI...", cover: "https://source.unsplash.com/600x400/?tech,ai" },
  { id: 2, title: "React Best Practices", author: "Mehta", date: "Sep 1, 2025", description: "A curated list of React tips and coding standards...", cover: "https://source.unsplash.com/600x400/?react,code" }
];

export default function Home() {
  return (
    <div className="home">
      {blogs.map(blog => (
        <BlogCard key={blog.id} {...blog} />
      ))}
    </div>
  );
}