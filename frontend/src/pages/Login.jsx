import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
    <div className="flex justify-center items-center h-screen bg-gray-950 text-white relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center text-gray-300 hover:text-white"
      >
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4 w-80"
      >
        <h2 className="text-xl font-bold">Login Admin</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded text-black"
        />
        <button className="bg-blue-500 w-full py-2 rounded">Login</button>
      </form>
    </div>
  );
}