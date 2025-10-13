import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaFigma } from "react-icons/fa";
import { SiFlutter, SiMongodb } from "react-icons/si";

export default function Skills() {
  const skills = [
    { name: "React.js", level: 80, icon: <FaReact className="text-sky-400" /> },
    { name: "Flutter", level: 75, icon: <SiFlutter className="text-blue-400" /> },
    { name: "Node.js", level: 70, icon: <FaNodeJs className="text-green-500" /> },
    { name: "MongoDB", level: 65, icon: <SiMongodb className="text-green-400" /> },
    { name: "Figma", level: 85, icon: <FaFigma className="text-pink-500" /> },
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-gray-950 text-white relative overflow-hidden">
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Skills
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 hover:scale-105 flex flex-col items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -10 }}
          >
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl z-10"></div>

            <motion.div
              className="text-6xl mb-6 relative z-20"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {skill.icon}
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
        ))}
      </motion.div>
    </section>
  );
}
