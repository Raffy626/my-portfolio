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
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      <h2
        className="text-3xl font-bold text-center mb-12 text-white-400"
        data-aos="zoom-in-up"
      >
        My Skills
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="zoom-in">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            data-aos="zoom-in-up"
          >
            <div className="text-5xl mb-4">{skill.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
            <span className="text-sm text-gray-400 mb-3">{skill.level}%</span>

            <div className="w-full h-3 bg-gray-800 rounded-lg overflow-hidden">
              <motion.div
                className="h-3 rounded-lg bg-gradient-to-r from-indigo-400 to-indigo-600"
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}