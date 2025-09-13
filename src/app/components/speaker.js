"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function SpeakerSection() {
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setAnimate(entry.isIntersecting);
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
      className="relative w-full min-h-screen flex items-center justify-center bg-[url('/speaker.webp')] bg-cover bg-center px-4 md:px-8 lg:px-16"
    >
      {/* Title */}
      <h2 className="absolute top-6 md:top-10 text-4xl  md:text-5xl lg:text-6xl text-[#EFE7A1] font-pixeboy drop-shadow-lg">
        SPEAKER
      </h2>
      <div className="absolute w-60 h-60 md:w-64 md:h-64 lg:w-80 lg:h-80 fly pointer-events-none">
        <video
          src="bat.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain"
        />
      </div>

      {/* Scroll + Overlay Text */}
      <div
        className={`relative flex items-center justify-center z-20 origin-top transition-all duration-700 ease-in-out mt-18
          ${animate ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}
        `}
      >
        <Image
          src="/patch.webp"
          alt="Patch"
          width={0}
          height={0}
          sizes="150vw"
          className="object-contain w-5/4 max-w-sm md:max-w-md lg:max-w-1xl h-auto"
          draggable="false"
        />

        {/* Overlay Text */}
        <p
          className={`absolute text-xl md:text-3xl lg:text-5xl font-pixeboy text-black transition-opacity duration-700 delay-100
            ${animate ? "opacity-100" : "opacity-0"}
          `}
        >
          STAY TUNED
        </p>
      </div>
    </section>
  );
}