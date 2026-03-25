"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProblemStatements() {
  const [active, setActive] = useState(null);

  const handleActivate = (i) => {
    setActive(active === i ? null : i);
  };

  const statements = [
    {
      title: "AI solutions",
      desc: "I. Education or II. Improving user workflow  or  III.Sustainable development  (You are allowed to choose any one amongst the three options provided)",
    },
    {
      title: "Gamedev without using a game engine",
      desc: "Build an original game by implementing core mechanics yourself without relying on full-scale engines like Unity, Unreal, or Godot. Lightweight frameworks such as Pygame, SDL, Web Canvas, or similar low-level libraries are allowed. ",
    },
    {
      title: "CLI Tools",
      desc: "Build powerful command-line tools that solve real developer or system-level problems.",
    },
    {
      title: "Extensions",
      desc: "Develop browser extensions that enhance productivity, accessibility, privacy,or user experience.",
    },
    {
      title: "Smart Cities",
      desc: "Identify a real urban problem and build a tech-driven solution to improve city infrastructure, public services, or civic management",
    },
    {
      title: "Build for Accessibility",
      desc: "Design inclusive technology solutions that improve accessibility and independence for users with disabilities. ",
    },
    {
      title: "Intelligent Symptom Analysis & Risk Assessment Platform",
      desc: "Build a structured healthcare reasoning system that analyzes user symptoms and generates grounded risk assessments",
    },
  ];

  return (
    <div id="ps" className="relative flex flex-col h-[80vh] lg:h-screen w-full text-center items-center">
      <Image
        src="/ps.webp"
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
        draggable="false"
      />

      <h1 className="text-2xl md:text-[6vh] font-bold text-[#f2e5a6] [text-shadow:3px_3px_#3a1d0c] animate-glow-pulse relative z-10 my-[5vh]">
        PROBLEM STATEMENTS
      </h1>

      <div className="flex flex-col md:flex-row w-[80vw] md:w-[60vw] gap-y-[1vh] gap-x-[2vw] md:gap-y-0 h-[100vh] md:h-[80vh] overflow-hidden relative z-10">
        {statements.map((s, i) => (
          <div
            key={i}
            className={`relative transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden
              ${active === i 
                ? "md:flex-[6] flex-[6] expand-bounce" 
                : active === null 
                  ? "flex-1" 
                  : "md:flex-[0.5] flex-[0.5]"
              }
            `}
            onMouseEnter={() => !("ontouchstart" in window) && setActive(i)}
            onMouseLeave={() => !("ontouchstart" in window) && setActive(null)}
            onClick={() => handleActivate(i)}
          >
            <Image
              src={`/ps/${i + 1}.png`}
              alt={s.title}
              fill
              className="object-cover brightness-110 contrast-110"
              loading="lazy"
              draggable="false"
            />

            {active === i && (
              <div className="absolute inset-0 flex flex-col bg-black/50 justify-center text-white text-2xl font-bold tracking-wider px-4">
                <h2 className="text-xl md:text-3xl font-bold mb-4 items-center">{s.title}</h2>
                <p className="text-[1.2vh] md:text-[2vh] leading-relaxed">{s.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
