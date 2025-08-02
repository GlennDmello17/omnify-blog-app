import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

function MyBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}api/blogs/my-blog`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, []);

  const togglePublish = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}api/blogs/${id}/publish`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) =>
          b._id === id ? { ...b, published: res.data.published } : b
        )
      );
    } catch (err) {
      console.error("Error toggling publish:", err);
    }
  };

  const deletePost = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs((prevBlogs) => prevBlogs.filter((b) => b._id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/edit-blog/${id}`);
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!blogs || blogs.length === 0)
    return <div className="p-6 text-center text-red-500">No blogs found.</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-1 text-gray-800 hover:text-black mb-6"
      >
        <ArrowLeft size={20} />
        <span className="text-sm">Back</span>
      </button>

      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">My Blogs</h1>

      {/* Responsive Blog Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-3">
                Status:{" "}
                <span className={blog.published ? "text-green-600" : "text-yellow-600"}>
                  {blog.published ? "Published" : "Draft"}
                </span>
              </p>
              <p className="text-gray-700 leading-relaxed line-clamp-4 whitespace-pre-line mb-4">
                {blog.content}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2 mt-4">
              <Link to={`/blogs/${blog._id}`}>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Read More
                </button>
              </Link>

              <button
                onClick={() => togglePublish(blog._id)}
                className={`px-4 py-2 rounded-lg transition ${
                  blog.published
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {blog.published ? "Unpublish" : "Publish"}
              </button>

              <button
                onClick={() => handleUpdate(blog._id)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Update
              </button>

              <button
                onClick={() => deletePost(blog._id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyBlog;
