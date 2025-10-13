import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Hero() {
  const fullText = "Raffy Reshaina Pasha";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const typeText = () => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(fullText.slice(0, i + 1));
        i++;
        if (i === fullText.length) {
          clearInterval(interval);
          setTimeout(() => {
            setDisplayText("");
            typeText();
          }, 8000);
        }
      }, 250);
    };
    typeText();
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center text-center px-6 bg-grid"
      data-aos="fade-in"
    >
      <motion.img
        src="/profile.jpeg"
        alt="Raffy Reshaina Pasha"
        className="w-60 h-60 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.h1
        className="mt-6 text-4xl md:text-6xl font-bold text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {displayText}
        <span className="animate-pulse">|</span>
      </motion.h1>

      <motion.p
        className="mt-3 text-lg md:text-2xl text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        UI/UX Designer & Mobile Developer
      </motion.p>

      <motion.div
        className="mt-6 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <a
          href="#portfolio"
          className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow transition"
        >
          View Project PKL
        </a>
        <a
          href="#contact"
          className="px-6 py-3 border border-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
}