import React, { useEffect, useState } from "react";
import { fetchAboutMe } from "../api";

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAboutData = async () => {
      try {
        const data = await fetchAboutMe();
        if (data.length > 0) {
          setAboutData(data[0]);
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAboutData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="text-center text-white">Loading...</div>
      </div>
    );
  }

  if (!aboutData) {
    return (
      <div className="bg-gray-900 py-24 sm:py-32">
        <div className="text-center text-white">No about data available</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 py-24 sm:py-32" data-aos="fade-in">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4" data-aos="zoom-in-up">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" data-aos="zoom-in-up" data-aos-delay="200"></div>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Personal Info */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="relative mb-8" data-aos="zoom-in">
              <img
                alt={aboutData.name}
                src={aboutData.image ? `http://localhost:5000${aboutData.image}` : "/profile.jpeg"}
                className="w-48 h-48 rounded-full object-cover border-4 border-gray-700 shadow-lg"
                onError={(e) => {
                  e.target.src = "/profile.jpeg";
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2" data-aos="fade-up">{aboutData.name}</h3>
            <p className="text-lg text-gray-400 mb-6" data-aos="fade-up" data-aos-delay="100">{aboutData.title}</p>
            <p className="text-gray-300 leading-relaxed text-center lg:text-left" data-aos="fade-up" data-aos-delay="200">
              {aboutData.description}
            </p>
          </div>

          {/* Right Column: Skills/Experience */}
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50" data-aos="zoom-in-up" data-aos-delay="300">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                UI/UX Design
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {aboutData.uiuxDescription}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50" data-aos="zoom-in-up" data-aos-delay="400">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                Mobile Development
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {aboutData.mobileDescription}
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50" data-aos="zoom-in-up" data-aos-delay="500">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                Internship Experience
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {aboutData.internshipDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
