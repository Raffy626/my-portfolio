import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <div className="text-2xl font-bold text-indigo-400">Raffy Portfolio</div>

        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#home" className="hover:text-indigo-400">Home</a>
          <a href="#about" className="hover:text-indigo-400">About</a>
          <a href="#skills" className="hover:text-indigo-400">Skills</a>
          <a href="#portfolio" className="hover:text-indigo-400">Project</a>
          <a href="#contact" className="hover:text-indigo-400">Contact</a>
        </nav>
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 px-6 py-4 space-y-4">
          <a href="#home" className="block hover:text-indigo-400">Home</a>
          <a href="#about" className="block hover:text-indigo-400">About</a>
          <a href="#skills" className="block hover:text-indigo-400">Skills</a>
          <a href="#contact" className="block hover:text-indigo-400">Contact</a>
        </div>
      )}
    </header>
  );
}