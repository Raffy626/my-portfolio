import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchSkills } from "../api";
import { Code, Palette, Smartphone, Database, Wrench, Star } from "lucide-react";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const iconMap = {
    'Code': Code,
    'Palette': Palette,
    'Smartphone': Smartphone,
    'Database': Database,
    'Wrench': Wrench,
    'Star': Star,
    'React': Code,
    'Pallete': Palette,
  };

  const colorMap = {
    'Code': 'text-sky-400',
    'Palette': 'text-pink-500',
    'Smartphone': 'text-blue-400',
    'Database': 'text-green-400',
    'Wrench': 'text-orange-400',
    'Star': 'text-yellow-400',
    'React': 'text-sky-400',
    'Pallete': 'text-pink-500',
    'default': 'text-indigo-400'
  };

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    loadSkills();
  }, []);

  return (
    <section id="skills" className="py-20 px-6 bg-gray-950 text-white relative overflow-hidden" data-aos="fade-in">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        data-aos="fade-up"
      >
        My Skills
      </motion.h2>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          <p className="mt-4 text-gray-400">Loading skills...</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Star;
            const iconColor = colorMap[skill.icon] || colorMap.default;
            return (
              <motion.div
                key={skill._id}
                className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 hover:scale-105 flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
                data-aos="zoom-in"
                data-aos-delay={300 + index * 100}
              >
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-10"></div>

                <motion.div
                  className="text-6xl mb-6 relative z-20"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <IconComponent className={`${iconColor}`} />
                </motion.div>
                <h3 className="text-xl font-bold mb-3 text-indigo-300 group-hover:text-indigo-200 transition-colors duration-300 relative z-20">
                  {skill.name}
                </h3>
                <span className="text-base text-gray-300 mb-4 relative z-20">{skill.level}% Proficiency</span>

                <div className="w-full h-4 bg-gray-700/50 rounded-full overflow-hidden relative z-20">
                  <motion.div
                    className="h-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
