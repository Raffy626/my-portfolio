import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2, LogOut, Upload, Link as LinkIcon } from "lucide-react";
import Swal from 'sweetalert2';

export default function Admin() {
  const [portfolios, setPortfolios] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    link: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch data
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/portfolios");
      setPortfolios(res.data);
    } catch (err) {
      console.error("Error fetching:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to load portfolios",
        icon: "error",
        background: "#1a1a1a",
        color: "#e6e6e6",
      });
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit add / update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("link", form.link);
      if (form.image) formData.append("image", form.image);

      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/portfolios/${editingId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        Swal.fire({
          title: "Success",
          text: "Portfolio updated!",
          icon: "success",
          background: "#1a1a1a",
          color: "#e6e6e6",
        });
      } else {
        await axios.post("http://localhost:5000/api/portfolios", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Swal.fire({
          title: "Success",
          text: "Portfolio added!",
          icon: "success",
          background: "#1a1a1a",
          color: "#e6e6e6",
        });
      }

      setForm({ title: "", description: "", image: null, link: "" });
      setEditingId(null);
      fetchPortfolios();
    } catch (err) {
      console.error("Error submit:", err.response?.data || err.message);
      Swal.fire({
        title: "Error",
        text: "Failed to add/update portfolio",
        icon: "error",
        background: "#1a1a1a",
        color: "#e6e6e6",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Edit
  const handleEdit = (p) => {
    setForm({
      title: p.title,
      description: p.description,
      image: null,
      link: p.link,
    });
    setEditingId(p._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1a1a1a",
      color: "#e6e6e6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/api/portfolios/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your portfolio has been deleted.",
            icon: "success",
            background: "#1a1a1a",
            color: "#e6e6e6",
          });
          fetchPortfolios();
        } catch (err) {
          console.error("Error delete:", err);
          Swal.fire({
            title: "Error",
            text: "Failed to delete portfolio",
            icon: "error",
            background: "#1a1a1a",
            color: "#e6e6e6",
          });
        }
      }
    });
  };

  // Handle Logout
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn("Logout warning:", err.message);
    }

    localStorage.removeItem("token");
    Swal.fire({
      title: "Success",
      text: "Logout berhasil!",
      icon: "success",
      background: "#1a1a1a",
      color: "#e6e6e6",
    });
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-gray-300 hover:text-indigo-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-indigo-400 mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage your portfolio projects</p>
        </div>

        {/* Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Plus className="w-6 h-6 mr-2 text-indigo-400" />
            {editingId ? "Edit Portfolio" : "Add New Portfolio"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter project title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Project Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="url"
                    name="link"
                    placeholder="https://example.com"
                    value={form.link}
                    onChange={handleChange}
                    className="w-full pl-10 p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                name="description"
                placeholder="Describe your project..."
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Project Image</label>
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-full p-4 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-200"
                >
                  <Upload className="w-6 h-6 mr-2 text-gray-400" />
                  <span className="text-gray-400">
                    {form.image ? form.image.name : "Click to upload image"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <Plus className="w-5 h-5 mr-2" />
                )}
                {editingId ? "Update Portfolio" : "Add Portfolio"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setForm({ title: "", description: "", image: null, link: "" });
                    setEditingId(null);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Portfolio List */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Your Portfolios ({portfolios.length})</h2>

          {portfolios.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No portfolios yet</div>
              <p className="text-gray-500 mt-2">Add your first project above</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map((p) => (
                <div
                  key={p._id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300 group"
                >
                  <div className="relative">
                    <img
                      src={`http://localhost:5000${p.image}`}
                      alt={p.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        View Project
                      </a>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{p.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{p.description}</p>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
