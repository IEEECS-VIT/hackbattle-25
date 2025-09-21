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
      title: "The Whispering Blocks",
      desc: "Create a game or experience where the world isn’t static. The blocks, objects, or behaviours should react, change, or adapt to the player in some way."
    },
    {
      title: "The Living Ledger",
      desc: "Financial identities today are frozen snapshots of the past. What if they were fluid, evolving, and alive in real time? Reimagine how a person’s financial story could be told—not as numbers on a report, but as something dynamic, predictive, and deeply personal."
    },
    {
      title: "The Sixth Sense Device",
      desc: "Our world is filled with forces we cannot see, hear, or touch. What if we could feel them? Design a way to give humans a 'sixth sense'—a subtle, intuitive channel for perceiving the invisible aspects of their environment."
    },
    {
      title: "From Passive to Active Knowledge",
      desc: "Knowledge is often consumed passively—but true learning comes from transformation. How might you turn static content into experiences that spark curiosity, action, and creation? Build something that makes knowledge come alive."
    },
    {
      title: "The Ambient Health Guardian",
      desc: "Health isn’t limited to hospitals or apps; it lives in our everyday choices, environments, and habits. What if there were a guardian that quietly walked beside us, nudging us toward better health without demanding our attention? Envision what that guardian could be."
    },
    {
      title: "The Shadow Hunter",
      desc: "Systems and applications often hide weaknesses beneath the surface, invisible until it’s too late. What if you could build something that uncovers these hidden cracks, shining light on vulnerabilities before they can be exploited?"
    },
    {
      title: "The Invisible Scalability Test",
      desc: "Most apps scale well in theory but fail under sudden, unpredictable spikes (think ticket bookings, flash sales, or viral posts). What if you could design a system that stress tests applications invisibly in production, highlighting weak spots without breaking user experience?"
    }
  ];

  return (
    <div id="ps" className="relative flex flex-col h-screen w-full text-center items-center">
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
