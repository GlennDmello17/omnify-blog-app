import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function CreateBlogs() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false); // ✅ new state
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs`,
        { title, content, published }, // ✅ include published
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        navigate("/blogs");
      }
    } catch (err) {
      console.error("Error creating blog:", err);
      setError("Failed to create blog. Try again.");
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-1 text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span className="text-sm sm:text-base">Back</span>
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
        Create New Blog
      </h1>

      {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          className="w-full p-3 border border-gray-300 rounded-xl text-base"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your content here..."
          className="w-full p-3 border border-gray-300 rounded-xl h-48 resize-none text-base"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* ✅ Published checkbox */}
        <div className="flex items-center gap-2">
          <input
            id="publish"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="publish" className="text-gray-700">
            Publish
          </label>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
}

export default CreateBlogs;
