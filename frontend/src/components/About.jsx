import React, { useEffect, useRef } from "react";

export default function About() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.2;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-24 sm:py-32 overflow-hidden" data-aos="fade-in">
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute top-0 left-0 w-full h-full opacity-5"
        >
          <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.05),transparent_70%)]"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <p className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
            About Me
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8" data-aos="fade-up" data-aos-delay="200">
          {/* Personal Card */}
          <div className="relative group" data-aos="zoom-in" data-aos-delay="300">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-indigo-500/25 transition-all duration-500">
              <div className="p-8 sm:p-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Raffy Reshaina Pasha</h3>
                    <p className="text-sm text-indigo-400">UI/UX Designer & Mobile Developer</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Hi, I'm Raffy, a passionate UI/UX Designer and Mobile Developer with hands-on experience from my internship.
                </p>
                <div className="flex justify-center">
                  <img
                    alt="Raffy Reshaina Pasha"
                    src="/profileporto.jpeg"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* UI/UX Design Card */}
          <div className="relative group" data-aos="fade-right" data-aos-delay="400">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-500">
              <div className="p-8 sm:p-12">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">UI/UX Design</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I focus on designing user-centered interfaces that combine functionality, usability, and visual appeal.
                </p>
                <div className="flex justify-center">
                  <img
                    alt="UI/UX Design"
                    src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
                    className="w-full max-w-xs rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Development Card */}
          <div className="relative group" data-aos="fade-left" data-aos-delay="500">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-teal-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-green-500/25 transition-all duration-500">
              <div className="p-8 sm:p-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414-1.414L15.586 7H12z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M5 5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2H9a1 1 0 010-2h8V7a2 2 0 00-2-2H5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Mobile Development</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I build responsive and efficient mobile applications that meet user needs and deliver meaningful impact.
                </p>
                <div className="flex justify-center">
                  <img
                    alt="Mobile Development"
                    src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                    className="w-full max-w-xs rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Internship Experience Card */}
          <div className="relative group" data-aos="zoom-in" data-aos-delay="600">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden shadow-2xl group-hover:shadow-purple-500/25 transition-all duration-500">
              <div className="p-8 sm:p-10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Internship Experience</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  During my internship, I strengthened skills in collaboration, adaptability, and attention to detail.
                </p>
                <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-400">Portfolio.jsx</span>
                  </div>
                  <div className="text-xs text-gray-500 font-mono">console.log("Building amazing apps!")</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
