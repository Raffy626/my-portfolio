import React, { useEffect, useState } from "react";
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
      className="px-6 py-12 bg-gray-950 text-white transition-all duration-500 ease-in-out"
    >
      <h1
        className="text-3xl font-bold mb-10 text-center"
        data-aos="zoom-in"
      >
        My Project
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500 ease-in-out"
      >
        {portfolios.map((p) => (
          <div
            key={p._id}
            className="rounded-2xl overflow-hidden shadow-lg bg-gray-800 hover:shadow-2xl transition duration-300"
            data-aos="zoom-in-up"
          >
            {/* Gambar */}
            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.title}
              className="w-full h-56 object-cover scale-100 hover:scale-105 transition-transform duration-300"
            />

            {/* Teks di bawah gambar */}
            <div className="p-5 text-center">
              <h3 className="text-xl font-semibold mb-2 text-indigo-400">
                {p.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4">{p.description}</p>
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition"
              >
                Lihat Detail →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}