import React from "react";

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-gray-900">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
        <div data-aos="fade-right" className="flex justify-center">
          <img
            src="/profileporto.jpeg"
            alt="Raffy Reshaina Pasha"
            className="w-72 h-73 object-cover rounded-2xl shadow-lg border-4 border-indigo-500"
          />
        </div>
        <div data-aos="fade-left" className="text-left">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            Hi, my name is <span className="text-indigo-400">Raffy Reshaina Pasha</span>, a passionate and motivated UI/UX Designer and Mobile Developer with hands-on experience during my internship. I focus on designing user-centered interfaces and developing mobile applications that combine functionality, usability, and visual appeal.
          </p>

          <p className="text-gray-400 leading-relaxed mb-6">
            I enjoy turning ideas into seamless digital experiences by blending creativity with problem-solving skills. As a designer, I strive to create intuitive and engaging interfaces, while as a developer, I aim to build responsive and efficient mobile applications that meet user needs.
          </p>

          <p className="text-gray-400 leading-relaxed">
            During my internship, I have strengthened my skills in collaboration, adaptability, and attention to detail, while contributing to real projects that deliver meaningful impact. I am eager to continue learning and growing in this field, and to bring value through innovative digital solutions.
          </p>
        </div>
      </div>
    </section>
  );
}