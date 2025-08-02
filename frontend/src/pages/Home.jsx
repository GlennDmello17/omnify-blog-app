import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/blogs/bulk?page=${page}`);
      setBlogs(res.data.blogs);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  const menuItems = [
    { name: 'signup', path: '/signup' },
    { name: 'signin', path: '/signin' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-100">
      <header><Navbar navItems={menuItems} /></header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="text-center px-6 py-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Share Your Voice with Blog+</h2>
          <p className="text-gray-600 mb-8 text-lg">Create, explore, and express ideas through beautiful, public blog posts.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <div className="rounded-lg bg-white w-full sm:w-96 text-center p-4 flex flex-col sm:flex-row justify-center gap-4">
              <Button
                label="Get Started"
                onClick={() => navigate('/signup')}
              />
              <Button
                label="Already have an account?"
                onClick={() => navigate('/signin')}
                extraClasses="border border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
              />
            </div>
            <div className="rounded-lg bg-white w-full sm:w-60 text-center p-4">
              <Button
                label="Write a blog"
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (!token) {
                    navigate('/signin');
                  }
                  navigate('/dashboard');
                }}
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-slate-300 py-12 px-6">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">How It Works</h3>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded shadow hover:shadow-md transition">
              <span className="text-4xl">✍️</span>
              <h4 className="text-lg font-semibold mt-4">Write Blogs</h4>
              <p className="text-sm text-gray-600">Craft your thoughts and share them with the world through your personal blogs.</p>
            </div>
            <div className="p-4 rounded shadow hover:shadow-md transition">
              <span className="text-4xl">🌐</span>
              <h4 className="text-lg font-semibold mt-4">Read Public Posts</h4>
              <p className="text-sm text-gray-600">Explore insightful articles and blogs created by others in the community.</p>
            </div>
            <div className="p-4 rounded shadow hover:shadow-md transition">
              <span className="text-4xl">🔒</span>
              <h4 className="text-lg font-semibold mt-4">Secure Account</h4>
              <p className="text-sm text-gray-600">Your profile and content are protected with secure authentication.</p>
            </div>
          </div>
        </section>

        {/* All Blogs Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <h2 className="text-2xl font-bold mb-6 text-center sm:text-left">Explore Blogs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-gray-800 break-words hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line line-clamp-3">
                  {blog.content}
                </p>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="text-blue-600 mt-2 inline-block hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 text-sm">
          <p>© {new Date().getFullYear()} Glenn Dmello – All rights reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="https://github.com/GlennDmello17" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 flex items-center gap-1">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/glenn-dmello-24291a238/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
