"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export default function SpeakerSection() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

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

  return (
    <section
      id="speaker"
      ref={sectionRef}
      className="relative w-full h-[70vh] md:h-[100vh] flex flex-col items-center bg-[url('/speaker.webp')] bg-cover bg-center px-4 md:px-8 lg:px-16"
    >
      <h2 className="text-2xl md:text-[6vh] font-bold text-[#f2e5a6] [text-shadow:3px_3px_#3a1d0c] animate-glow-pulse relative z-10 my-[5vh]">
        JUDGE
      </h2>
      <div className="absolute w-60 h-60 md:w-64 md:h-64 lg:w-96 lg:h-96 fly pointer-events-none">
        <Image
          src="/minecraft-bat.gif"
          height={0}
          width={0}
          className="w-full h-full object-contain"
          alt="Bat"
        />
      </div>

      <div
        className={`relative flex flex-col items-center justify-center z-20 origin-top transition-all duration-700 ease-in-out mt-[10vh] md:mt-0
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
      className="object-cover"
    />
  </div>

  <p className="text-lg md:text-2xl lg:text-3xl font-pixeboy text-black">
    Shubham Singh
  </p>
  <a
    href="https://www.linkedin.com/in/shubham-0707"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-700 hover:text-blue-900"
  >
    <FaLinkedin className="text-[28px] md:text-[48px]" />
  </a>
</div>

      </div>
    </section>
  );
}
