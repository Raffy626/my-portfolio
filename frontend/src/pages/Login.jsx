import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import Swal from 'sweetalert2';

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/admin");
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Login gagal",
          icon: "error",
        });
      }
    } catch (err) {
      console.error("Error login:", err);
      Swal.fire({
        title: "Error",
        text: "Terjadi error saat login",
        icon: "error",
      });
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden animate-fade-in"  // Gradient background dan animasi fade-in
    >
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center text-gray-300 hover:text-white transition-transform duration-200 hover:scale-105"
      >
        <ArrowLeft className="w-5 h-5 mr-2" /> Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-xl space-y-6 w-80 max-w-md mx-auto border border-gray-700/50"  // Efek glassmorphism dengan backdrop blur
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Login Admin
        </h2>

        <div className="relative">
          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
            Email
          </label>
          <div className="flex items-center border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition duration-200">
            <Mail className="absolute left-3 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Masukkan email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg text-black bg-gray-700/50 focus:outline-none transition duration-200"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">
            Password
          </label>
          <div className="flex items-center border border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition duration-200">
            <Lock className="absolute left-3 text-gray-400" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 p-3 rounded-lg text-black bg-gray-700/50 focus:outline-none transition duration-200"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}