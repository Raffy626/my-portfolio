import React, {useState} from "react";
import { login } from "../api";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AdminLogin(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const nav = useNavigate();

  async function submit(e){
    e.preventDefault();
    try {
      const res = await login(email,password);
      if(res.token){
        localStorage.setItem("token", res.token);
        nav("/admin/dashboard");
      } else {
        Swal.fire({
          title: "Error",
          text: res.message || "Login failed",
          icon: "error",
        });
      }
    } catch(err){
      Swal.fire({
        title: "Error",
        text: "Login error",
        icon: "error",
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-gray-900 w-full max-w-md p-6 rounded-lg shadow">
        <h3 className="text-2xl mb-4">Admin Login</h3>
        <input value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-3 mb-3 rounded bg-gray-800" placeholder="email"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" className="w-full p-3 mb-3 rounded bg-gray-800" placeholder="password"/>
        <button className="w-full py-3 bg-indigo-500 rounded">Login</button>
      </form>
    </div>
  );
}