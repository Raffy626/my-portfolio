import React, { useEffect, useRef } from "react";

export default function About() {
  const parallaxRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-gray-900 py-24 sm:py-32 overflow-hidden" data-aos="fade-in">
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={parallaxRef}
          className="absolute top-0 left-0 w-full h-full opacity-10"
        >
          <div className="absolute top-20 left-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/30 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-blue-500/30 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute bottom-20 right-10 w-28 h-28 bg-pink-500/30 rounded-full blur-xl animate-pulse delay-1500"></div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-center text-base/7 font-semibold text-indigo-400" data-aos="fade-up">About Me</h2>
        <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl" data-aos="fade-up" data-aos-delay="100">
          Passionate UI/UX Designer & Mobile Developer
        </p>
        <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2" data-aos="fade-up" data-aos-delay="200">
          <div className="relative lg:row-span-2" data-aos="zoom-in" data-aos-delay="300">
            <div className="absolute inset-px rounded-lg bg-gray-800 lg:rounded-l-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Raffy Reshaina Pasha</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  Hi, I'm Raffy, a passionate UI/UX Designer and Mobile Developer with hands-on experience from my internship.
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center p-4">
                <img
                  alt="Raffy Reshaina Pasha"
                  src="/profileporto.jpeg"
                  className="w-full max-w-xs h-auto rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 lg:rounded-l-4xl" />
          </div>
          <div className="relative max-lg:row-start-1" data-aos="fade-right" data-aos-delay="400">
            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-t-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">UI/UX Design</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  I focus on designing user-centered interfaces that combine functionality, usability, and visual appeal.
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center px-8 max-lg:pt-10 max-lg:pb-12 sm:px-10 lg:pb-2">
                <img
                  alt="UI/UX Design"
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-performance.png"
                  className="w-full max-lg:max-w-xs"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-t-4xl" />
          </div>
          <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2" data-aos="fade-left" data-aos-delay="500">
            <div className="absolute inset-px rounded-lg bg-gray-800" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)]">
              <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Mobile Development</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  I build responsive and efficient mobile applications that meet user needs and deliver meaningful impact.
                </p>
              </div>
              <div className="@container flex flex-1 items-center max-lg:py-6 lg:pb-2">
                <img
                  alt="Mobile Development"
                  src="https://tailwindcss.com/plus-assets/img/component-images/dark-bento-03-security.png"
                  className="h-[min(152px,40cqw)] object-cover"
                />
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15" />
          </div>
          <div className="relative lg:row-span-2" data-aos="zoom-in" data-aos-delay="600">
            <div className="absolute inset-px rounded-lg bg-gray-800 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(var(--radius-lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
              <div className="px-8 pt-8 pb-3 sm:px-10 sm:pt-10 sm:pb-0">
                <p className="mt-2 text-lg font-medium tracking-tight text-white max-lg:text-center">Internship Experience</p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-400 max-lg:text-center">
                  During my internship, I strengthened skills in collaboration, adaptability, and attention to detail.
                </p>
              </div>
              <div className="relative min-h-120 w-full grow">
                <div className="absolute top-10 right-0 bottom-0 left-10 overflow-hidden rounded-tl-xl bg-gray-900/60 outline outline-white/10">
                  <div className="flex bg-gray-900 outline outline-white/5">
                    <div className="-mb-px flex text-sm/6 font-medium text-gray-400">
                      <div className="border-r border-b border-r-white/10 border-b-white/20 bg-white/5 px-4 py-2 text-white">
                        Portfolio.jsx
                      </div>
                      <div className="border-r border-gray-600/10 px-4 py-2">App.jsx</div>
                    </div>
                  </div>
                  <div className="px-6 pt-6 pb-14">console.log("hi")</div>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm outline outline-white/15 max-lg:rounded-b-4xl lg:rounded-r-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
