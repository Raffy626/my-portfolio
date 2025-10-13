import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/portfolios");
        setPortfolios(res.data);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
      }
    };
    fetchPortfolios();
  }, []);

  return (
    <section
      id="portfolio"
      className="px-6 py-16 bg-grid text-white relative overflow-hidden"
    >
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Projects
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {portfolios.map((p, index) => (
          <motion.div
            key={p._id}
            className="group relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -10 }}
          >
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>

            {/* Gambar */}
            <div className="relative overflow-hidden">
              <img
                src={`http://localhost:5000${p.image}`}
                alt={p.title}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>
            </div>

            {/* Teks di bawah gambar */}
            <div className="p-6 text-center relative z-20">
              <h3 className="text-2xl font-bold mb-3 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300">
                {p.title}
              </h3>
              <p className="text-gray-300 text-base mb-6 leading-relaxed">{p.description}</p>
              <motion.a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Details
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
