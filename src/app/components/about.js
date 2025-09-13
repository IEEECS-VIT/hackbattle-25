"use client";

import '../globals.css';
import GlowingSpores from "./GlowingSpores";
import Smoke from "./Smoke";
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="w-full h-screen select-none relative">
      {/* ✨ Glowing Spores (desktop only) */}
      <div className="hidden md:block absolute inset-0 z-[1]">
        <GlowingSpores />
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex w-full h-full bg-[url('/about.webp')] bg-center bg-cover items-center justify-center relative">
        <div className="relative w-[47vw] h-[72vh] rounded-[22px] bg-[url('/about-box-bg.svg')] bg-center bg-[length:100%_auto]">
          <Image
          loading='lazy'
            src="/about-marble.webp"
            alt="Overlay Box"
            width={594}
            height={650}
            className="absolute top-[3.4vh] left-0 w-[594vw] h-[65vh] z-[2] rounded-[18px] pointer-events-none"
          />

          <div className="w-full h-full absolute inset-0 flex items-center justify-center z-[2] pointer-events-none">
            <div className="w-[90%] h-[80%] px-5 py-4 text-center text-[#FAF6DA] font-['Press_Start_2P'] bg-[#023128] rounded-3xl">
              <h2 className="mt-[1vh] mb-[5vw] text-[2.4rem] font-bold text-[#f2e5a6] [text-shadow:3px_3px_#3a1d0c] animate-glow-pulse">
                ABOUT
              </h2>
              <p className="text-[1.1rem] leading-[1.6] text-shadow-lg text-shadow-black/80">
                Join the adrenaline-pumping 36-hour HackBattle by IEEE CS VIT, where tech innovators gather for
                groundbreaking challenges, keynote sessions, and engaging activities that ignite creativity and
                drive innovation.
              </p>
            </div>
          </div>
        </div>

        <div className="absolute left-[3vw] bottom-[8vh] z-[4]">
          <Smoke />
        </div>

        <div className="absolute right-[4vw] bottom-[3vh] z-[4]">
          <Image
          loading='lazy'
            src="/campfire.webp"
            alt="Campfire"
            width={400}
            height={400}
            className="w-[20vw] h-auto pointer-events-none"
          />
          <Smoke />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden h-[100vh] overflow-x-hidden bg-[url('/mobile-about-bg.svg')] bg-no-repeat bg-cover flex flex-col items-center relative text-[#FAF6DA] font-['Press_Start_2P']">
        <div className="relative w-full mt-[25vh]">
          <Image
          loading='lazy'
            src="/glass-back.webp"
            alt="Glass Back"
            width={500}
            height={500}
            className="absolute z-0 pointer-events-none
              left-1/2 -translate-x-1/2
              top-1/2 -translate-y-1/2
              scale-110 opacity-90 -rotate-[7deg]"
          />
          <Image
          loading='lazy'
            src="/glass-front-2.webp"
            alt="Glass Front"
            width={500}
            height={500}
            className="absolute z-[1] pointer-events-none
              w-[90%] h-auto
              left-1/2 -translate-x-1/2
              top-1/2 -translate-y-1/2
              scale-100"
          />
          <h1
            className="absolute left-1/2 -translate-x-1/2
            -top-[15vh]
            z-[2]
              text-[2.5rem] sm:text-[3rem] md:text-[4rem]
              font-bold text-[#f2e5a6] [text-shadow:3px_3px_#3a1d0c] animate-glow-pulse"
          >
            ABOUT
          </h1>

          <div className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none">
            <div className="w-[84%] text-center text-[#EFE7A1]">
              <p className="text-[0.75rem] leading-[1.95] opacity-95">
                Join the adrenaline-pumping 36-hour HackBattle by IEEE CS VIT, where tech innovators gather
                for groundbreaking challenges, keynote sessions, and engaging activities that ignite creativity
                and drive innovation.
              </p>
            </div>
          </div>

          <div className="invisible w-full pt-[100%]" />
        </div>

        <div className="absolute left-[32vw] bottom-[3vw] z-[4]">
          <Image
          loading='lazy'
            src="/campfire.webp"
            alt="Campfire"
            width={500}
            height={500}
            className="w-[50vw] h-auto pointer-events-none"
          />
          <Smoke />
        </div>
      </div>
    </section>
  );
};

export default About;
