import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react"; // Optional icon lib

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs/${id}`);
        setBlog(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!blog) return <div className="p-6 text-center text-red-500">Blog not found.</div>;
 
  return (
    <div className="max-w-3xl mx-auto p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 flex items-center space-x-1 text-gray-800 hover:text-gray-1000"
      >
        <ArrowLeft size={20} />
        <span className="text-sm">Back</span>
      </button>

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-2 text-gray-800 text-center mt-8">{blog.title}</h1>

{/* Author Name */}

  <p className="text-center text-sm text-gray-500 mb-6">By {blog.username}</p>
      {/* Blog Content */}
      <div
  className="text-gray-700 leading-relaxed whitespace-pre-line text-justify break-words"
>
  {blog.content}
</div>
    </div>
  );
}
