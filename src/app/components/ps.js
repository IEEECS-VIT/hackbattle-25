"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProblemStatements() {
  const [active, setActive] = useState(null);

  const handleActivate = (i) => {
    setActive(active === i ? null : i);
  };

  return (
    <div id="ps" className="relative flex flex-col items-center h-screen w-full text-center">
      <Image
        src="/ps.svg"
        alt="Background"
        fill
        className="object-cover -z-10"
        priority
        draggable="false"
      />

      <h1 className="text-2xl md:text-[6vh] font-bold text-[#f2e5a6] [text-shadow:3px_3px_#3a1d0c] animate-glow-pulse relative z-10 my-[5vh]">
        PROBLEM STATEMENTS
      </h1>

      <div className="flex flex-col md:flex-row w-[85vw] md:w-[60vw] gap-y-[1vh] gap-x-[1vw] md:gap-y-0 h-[80vh] overflow-hidden relative z-10">
        {Array.from({ length: 10 }, (_, i) => (
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
              alt={`Problem Statement ${i + 1}`}
              fill
              className="object-cover brightness-110 contrast-110"
              loading="lazy"
              draggable="false"
            />

            {active === i && (
              <div className="absolute inset-0">
              <Image
                src={`/ps/${i + 1}.png`}
                alt={`Problem Statement ${i + 1}`}
                fill
                className="object-cover brightness-110 contrast-110"
                loading="lazy"
                draggable="false"
              />
            
              <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold tracking-wider">
                <p>Coming Soon</p>
              </div>
            </div>
            
            )}
          </div>
        ))}
      </div>
    </div>
  );
}