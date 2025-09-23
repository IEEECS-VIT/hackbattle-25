"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export default function SpeakerSection() {
  const sectionRef = useRef(null);
  const batRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const [batPos, setBatPos] = useState({ top: 100, left: 100 }); // initial position

  // Intersection observer for patch + judge
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Random floating bat
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const moveBat = () => {
      const maxTop = el.clientHeight - 200; // 200 = bat size approx
      const maxLeft = el.clientWidth - 200;
      const newTop = Math.random() * maxTop;
      const newLeft = Math.random() * maxLeft;
      setBatPos({ top: newTop, left: newLeft });
    };

    const interval = setInterval(moveBat, 2000); // every 2 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="speaker"
      ref={sectionRef}
      className="relative w-full h-[70vh] md:h-[100vh] flex flex-col items-center justify-center bg-[url('/speaker.webp')] bg-cover bg-center px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      <h2 className="text-2xl md:text-[6vh] font-bold text-[#f2e5a6] [text-shadow:3px_3px_#3a1d0c] animate-glow-pulse relative z-10 my-[5vh]">
        JUDGE
      </h2>

      {/* Floating Bat */}
      <div
        ref={batRef}
        className="absolute w-60 h-60 md:w-64 md:h-64 lg:w-96 lg:h-96 pointer-events-none z-0 transition-all duration-1000 ease-in-out"
        style={{ top: `${batPos.top}px`, left: `${batPos.left}px` }}
      >
        <Image
          src="/minecraft-bat.gif"
          height={0}
          width={0}
          className="w-full h-full object-contain"
          alt="Bat"
        />
      </div>

      {/* Patch + Judge */}
      <div
        className={`relative flex flex-col items-center justify-center z-20 origin-top transition-all duration-700 ease-in-out
          ${animate ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
        `}
      >
        <Image
          src="/patch.webp"
          alt="Patch"
          width={1000}
          height={1000}
          className="object-contain w-3/4 lg:max-w-2xl"
          draggable="false"
        />

        <div
          className={`absolute flex flex-col items-center gap-3 transition-opacity duration-700 delay-100
            ${animate ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="relative -mt-8 lg:mt-0 h-32 w-32 md:h-48 md:w-48 lg:h-56 lg:w-56">
            <Image
              src="/shubham.png"
              alt="Judge"
              fill
              className="object-cover rounded-full"
            />
          </div>

          <p className="text-lg md:text-2xl lg:text-3xl font-pixeboy text-black">
            Shubham Singh
          </p>
          <a
            href="https://www.linkedin.com/in/shubham-0707"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300"
          >
            <FaLinkedin className="text-[28px] md:text-[48px]" />
          </a>
        </div>
      </div>
    </section>
  );
}
