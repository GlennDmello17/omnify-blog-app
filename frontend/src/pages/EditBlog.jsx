import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react"; 

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3000/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const blog = res.data;
        setTitle(blog.title);
        setContent(blog.content);
        setPublished(blog.published);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:3000/api/blogs/${id}`,
        { title, content, published },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog updated successfully!");
      navigate("/blogs");
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Something went wrong while updating.");
    }
  };

  if (loading) return <div className="p-6 text-center">Loading blog...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center text-gray-700 hover:text-gray-900"
      >
        <ArrowLeft size={20} />
        <span className="ml-1 text-sm">Back</span>
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        Edit Blog
      </h1>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-xl min-h-[180px] resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="publish"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="publish" className="text-gray-700">
            Published
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
