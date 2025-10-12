import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="zoom-in">
        <div>
          <h2 className="text-xl font-bold text-indigo-400" data-aos="zoom-in">
            Raffy Reshaina Pasha
          </h2>
          <p className="text-sm mt-2" data-aos="zoom-in">
            UI/UX Designer & Mobile Developer. Passionate about building
            interactive digital products with clean design and smooth
            experience.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3" data-aos="zoom-in">Quick Links</h3>
          <ul className="space-y-2 text-sm" data-aos="zoom-in">
            <li><a href="#home" className="hover:text-indigo-400">Home</a></li>
            <li><a href="#about" className="hover:text-indigo-400">About</a></li>
            <li><a href="#skills" className="hover:text-indigo-400">Skills</a></li>
            <li><a href="#portfolio" className="hover:text-indigo-400">Project</a></li>
            <li><a href="#contact" className="hover:text-indigo-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-3" data-aos="zoom-in">Connect</h3>
          <div className="flex space-x-4">
            <a href="https://github.com/raffy" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com/in/raffy" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              <Linkedin size={22} />
            </a>
            <a href="https://instagram.com/raffy" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400">
              <Instagram size={22} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Raffy Reshaina Pasha. All rights reserved.
      </div>
    </footer>
  );
}