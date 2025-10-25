import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Edit, Trash2, LogOut, Upload, Link as LinkIcon, User } from "lucide-react";
import Swal from 'sweetalert2';
import { fetchAboutMe, createAboutMe, updateAboutMe, deleteAboutMe } from "../api";

export default function Admin() {
  const [activeTab, setActiveTab] = useState('projects');
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

  // About Me state
  const [aboutList, setAboutList] = useState([]);
  const [aboutForm, setAboutForm] = useState({
    name: "",
    title: "",
    description: "",
    image: null,
    uiuxDescription: "",
    mobileDescription: "",
    internshipDescription: ""
  });
  const [editingAbout, setEditingAbout] = useState(null);
  const [isAboutLoading, setIsAboutLoading] = useState(false);

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

  // Fetch About Me data
  const fetchAbout = async () => {
    try {
      const data = await fetchAboutMe();
      setAboutList(data);
    } catch (err) {
      console.error("Error fetching about:", err);
    }
  };

  useEffect(() => {
    fetchPortfolios();
    fetchAbout();
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

  // About Me functions
  const handleAboutSubmit = async (e) => {
    e.preventDefault();
    setIsAboutLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", aboutForm.name);
      formData.append("title", aboutForm.title);
      formData.append("description", aboutForm.description);
      formData.append("uiuxDescription", aboutForm.uiuxDescription);
      formData.append("mobileDescription", aboutForm.mobileDescription);
      formData.append("internshipDescription", aboutForm.internshipDescription);
      if (aboutForm.image) formData.append("image", aboutForm.image);

      if (editingAbout) {
        await updateAboutMe(editingAbout._id, formData);
        Swal.fire({
          title: "Success",
          text: "About Me updated!",
          icon: "success",
          background: "#1a1a1a",
          color: "#e6e6e6",
        });
      } else {
        await createAboutMe(formData);
        Swal.fire({
          title: "Success",
          text: "About Me added!",
          icon: "success",
          background: "#1a1a1a",
          color: "#e6e6e6",
        });
      }

      setAboutForm({
        name: "",
        title: "",
        description: "",
        image: null,
        uiuxDescription: "",
        mobileDescription: "",
        internshipDescription: ""
      });
      setEditingAbout(null);
      fetchAbout();
    } catch (err) {
      console.error("Error submit about:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to add/update About Me",
        icon: "error",
        background: "#1a1a1a",
        color: "#e6e6e6",
      });
    } finally {
      setIsAboutLoading(false);
    }
  };

  const handleAboutEdit = (about) => {
    setAboutForm({
      name: about.name,
      title: about.title,
      description: about.description,
      image: null, // Reset image for editing
      uiuxDescription: about.uiuxDescription,
      mobileDescription: about.mobileDescription,
      internshipDescription: about.internshipDescription
    });
    setEditingAbout(about);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAboutDelete = async (id) => {
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
          await deleteAboutMe(id);
          Swal.fire({
            title: "Deleted!",
            text: "About Me has been deleted.",
            icon: "success",
            background: "#1a1a1a",
            color: "#e6e6e6",
          });
          fetchAbout();
        } catch (err) {
          console.error("Error delete about:", err);
          Swal.fire({
            title: "Error",
            text: "Failed to delete About Me",
            icon: "error",
            background: "#1a1a1a",
            color: "#e6e6e6",
          });
        }
      }
    });
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
          <p className="text-gray-400">Manage your portfolio projects and about me section</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'about'
                ? 'bg-indigo-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            About Me
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <>
            {/* Portfolio Form */}
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
          </>
        )}

        {/* About Me Tab */}
        {activeTab === 'about' && (
          <>
            {aboutList.length >= 1 && !editingAbout ? (
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-8">
                <p className="text-yellow-400 text-sm">
                  You can only have one About Me entry. Edit the existing one or delete it to create a new one.
                </p>
              </div>
            ) : (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-gray-700">
                <h2 className="text-2xl font-semibold mb-6 flex items-center">
                  <User className="w-6 h-6 mr-2 text-indigo-400" />
                  {editingAbout ? "Edit About Me" : "Add About Me"}
                </h2>

                <form onSubmit={handleAboutSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        value={aboutForm.name}
                        onChange={(e) => setAboutForm({...aboutForm, name: e.target.value})}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                      <input
                        type="text"
                        placeholder="Enter your title"
                        value={aboutForm.title}
                        onChange={(e) => setAboutForm({...aboutForm, title: e.target.value})}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea
                      placeholder="Describe yourself..."
                      value={aboutForm.description}
                      onChange={(e) => setAboutForm({...aboutForm, description: e.target.value})}
                      rows={3}
                      className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Profile Image</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAboutForm({...aboutForm, image: e.target.files[0]})}
                        className="hidden"
                        id="about-image-upload"
                      />
                      <label
                        htmlFor="about-image-upload"
                        className="flex items-center justify-center w-full p-4 bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors duration-200"
                      >
                        <Upload className="w-6 h-6 mr-2 text-gray-400" />
                        <span className="text-gray-400">
                          {aboutForm.image ? aboutForm.image.name : "Click to upload profile image"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">UI/UX Description</label>
                      <textarea
                        placeholder="UI/UX experience..."
                        value={aboutForm.uiuxDescription}
                        onChange={(e) => setAboutForm({...aboutForm, uiuxDescription: e.target.value})}
                        rows={2}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Mobile Description</label>
                      <textarea
                        placeholder="Mobile development experience..."
                        value={aboutForm.mobileDescription}
                        onChange={(e) => setAboutForm({...aboutForm, mobileDescription: e.target.value})}
                        rows={2}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Internship Description</label>
                      <textarea
                        placeholder="Internship experience..."
                        value={aboutForm.internshipDescription}
                        onChange={(e) => setAboutForm({...aboutForm, internshipDescription: e.target.value})}
                        rows={2}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={isAboutLoading || (aboutList.length >= 1 && !editingAbout)}
                      className="flex items-center bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
                    >
                      {isAboutLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      ) : (
                        <Plus className="w-5 h-5 mr-2" />
                      )}
                      {editingAbout ? "Update About Me" : "Add About Me"}
                    </button>

                    {editingAbout && (
                      <button
                        type="button"
                        onClick={() => {
                          setAboutForm({
                            name: "",
                            title: "",
                            description: "",
                            imageUrl: "",
                            uiuxDescription: "",
                            mobileDescription: "",
                            internshipDescription: ""
                          });
                          setEditingAbout(null);
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </>
        )}

        {/* Projects Tab Content */}
        {activeTab === 'projects' && (
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
        )}

        {/* About Me Tab Content */}
        {activeTab === 'about' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">About Me Entries ({aboutList.length})</h2>

            {aboutList.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg">No about me entries yet</div>
                <p className="text-gray-500 mt-2">Add your about me information above</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aboutList.map((about) => (
                  <div
                    key={about._id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{about.name}</h3>
                        <p className="text-indigo-400 text-sm">{about.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAboutEdit(about)}
                          className="flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleAboutDelete(about._id)}
                          className="flex items-center bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{about.description}</p>

                    {about.image && (
                      <img
                        src={`http://localhost:5000${about.image}`}
                        alt={about.name}
                        className="w-20 h-20 rounded-full object-cover mb-4"
                      />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      {about.uiuxDescription && (
                        <div>
                          <span className="font-medium text-gray-300">UI/UX:</span>
                          <p className="text-gray-400 mt-1">{about.uiuxDescription}</p>
                        </div>
                      )}
                      {about.mobileDescription && (
                        <div>
                          <span className="font-medium text-gray-300">Mobile:</span>
                          <p className="text-gray-400 mt-1">{about.mobileDescription}</p>
                        </div>
                      )}
                      {about.internshipDescription && (
                        <div>
                          <span className="font-medium text-gray-300">Internship:</span>
                          <p className="text-gray-400 mt-1">{about.internshipDescription}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}