import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Admin() {
  const [portfolios, setPortfolios] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    link: "",
  });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  // Fetch data
  const fetchPortfolios = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/portfolios");
      setPortfolios(res.data);
    } catch (err) {
      console.error("Error fetching:", err);
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
        alert("✅ Portfolio updated!");
      } else {
        await axios.post("http://localhost:5000/api/portfolios", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ Portfolio added!");
      }

      setForm({ title: "", description: "", image: null, link: "" });
      setEditingId(null);
      fetchPortfolios();
    } catch (err) {
      console.error("Error submit:", err.response?.data || err.message);
      alert("❌ Gagal menambahkan/mengupdate portfolio");
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
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin mau hapus portfolio ini?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/portfolios/${id}`);
      alert("🗑️ Portfolio deleted!");
      fetchPortfolios();
    } catch (err) {
      console.error("Error delete:", err);
      alert("❌ Gagal menghapus portfolio");
    }
  };

  // 🔹 Handle Logout
  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      // Jika token juga disimpan di MongoDB, panggil endpoint logout
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn("Logout warning:", err.message);
    }

    localStorage.removeItem("token");
    alert("👋 Logout berhasil!");
    navigate("/login");
  };

  return (
    <div className="p-10 bg-gray-100 min-h-screen relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        {/* Arrow Back */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-black"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>

        {/* 🔹 Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-6">Admin Portfolio</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
        />
        <input
          type="text"
          name="link"
          placeholder="Project Link"
          value={form.link}
          onChange={handleChange}
          className="w-full p-2 border rounded text-black"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editingId ? "Update Portfolio" : "Add to Portfolio"}
        </button>
      </form>

      {/* List Portfolio */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded-lg shadow-md">
            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg text-black font-semibold mt-2">{p.title}</h3>
            <p className="text-black text-sm">{p.description}</p>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-sm"
            >
              View →
            </a>
            <div className="mt-3 flex space-x-2">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
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