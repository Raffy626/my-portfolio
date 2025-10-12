import React from "react";
import { useParams, Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Website Company Profile",
    description: "Website company profile modern dengan TailwindCSS",
    image: "/images/project1.jpg",
    details: "Website ini dibuat menggunakan React, TailwindCSS, dan Node.js di backend."
  },
  {
    id: 2,
    title: "E-Commerce App",
    description: "Platform belanja online dengan fitur cart & pembayaran",
    image: "/images/project2.jpg",
    details: "Aplikasi e-commerce dengan React, Redux, ExpressJS, dan MongoDB."
  },
  {
    id: 3,
    title: "Portfolio App",
    description: "Portfolio pribadi dengan dark mode",
    image: "/images/project3.jpg",
    details: "Dibuat full React + Tailwind, responsive untuk mobile & desktop."
  },
];

export default function PortfolioDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return <p className="text-center text-red-500 mt-10">Project tidak ditemukan</p>;
  }

  return (
    <div className="p-8 text-white">
      <Link to="/" className="text-blue-400 hover:underline">&larr; Kembali</Link>
      <div className="mt-6">
        <img src={project.image} alt={project.title} className="w-full max-h-80 object-cover rounded-lg" />
        <h1 className="text-3xl font-bold mt-4">{project.title}</h1>
        <p className="text-gray-400 mt-2">{project.description}</p>
        <p className="mt-4">{project.details}</p>
      </div>
    </div>
  );
}