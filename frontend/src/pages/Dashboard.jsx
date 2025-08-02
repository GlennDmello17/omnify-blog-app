import Navbar from '../components/Navbar.jsx';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userInfo, setUserInfo] = useState("user");

  // Fetch all blogs (paginated)
  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const fetchBlogs = async (page) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blogs/bulk?page=${page}`);
      setBlogs(res.data.blogs);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    }
  };

  // Fetch logged-in user data
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserInfo(response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const menuItems = [
    { name: 'Create Blog', path: '/create' },
    { name: 'Your Blogs', path: '/blogs' },
    { name: 'Logout', path: '/' }
  ];

  return (
    <>
      <header><Navbar navItems={menuItems} /></header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Welcome, {userInfo.username}
        </h1>

        {/* Blogs Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Explore Blogs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm whitespace-pre-line line-clamp-3">{blog.content}</p>
                <Link
                  to={`/blogs/${blog._id}`}
                  className="mt-3 inline-block text-blue-600 font-medium hover:underline"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${currentPage === 1 ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
          >
            Previous
          </button>
          <span className="text-gray-700 font-medium">Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${currentPage === totalPages ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"}`}
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
            <a href="https://github.com/GlennDmello17" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 flex items-center gap-1">
              <FaGithub /> GitHub
            </a>
            <a href="https://www.linkedin.com/in/glenn-dmello-24291a238/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 flex items-center gap-1">
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
