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
        console.error(err);
      }
    };
    fetchPortfolios();
  }, []);

  return (
    <div className="py-10 px-6 bg-gray-950 text-white">
      <h2 className="text-2xl font-bold mb-6">My Portfolios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolios.map((p) => (
          <div key={p._id} className="bg-gray-800 p-4 rounded-lg shadow-md" data-aos="zoom-in-up">
            <img
              src={p.image}
              alt={p.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold mt-2">{p.title}</h3>
            <p className="text-gray-400 text-sm">{p.description}</p>
            <a
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              View Project →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}