"use client";

import Image from "next/image";
import Phonenavbar from "./phonenavbar";
import Link from "next/link";

export default function LandingPagePhone() {
  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-white font-pixeboy select-none">
      {/* Background */}
      <Image
        src="/landing-bg.webp"
        alt="Background"
        fill
        priority
        className="object-cover"
        draggable={false}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center w-64 h-[100vh] overflow-hidden z-0 opacity-60">
        <video
          src="/video/waterfall.webm"
          alt="Waterfall"
          autoPlay
          loop
          muted
          playsInline
          className="w-100 h-210 object-cover"
          draggable={false}
        />
      </div>

    
      <Phonenavbar />

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <section className="relative z-10 flex flex-col items-center justify-center text-center font-pixeboy -mt-[60vh]">
          <div className="text-8xl bg-clip-text [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] leading-tight">
            Hack
          </div>
          <div className="text-8xl bg-clip-text -mt-15 [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] leading-tight">
            BATTLE
          </div>
          <div className="text-4xl mt-4">JOIN THE ULTIMATE</div>
          <div className="text-4xl -mt-2">36 hour HACKATHON</div>
        </section>

        {/* Character and Bubble container */}
        <div className="absolute top-95 left-1/3 -translate-x-1/2 flex flex-col items-center">
          {/* Bubble above Steve */}
          <div className="relative mb-4">
            <div className="relative inline-block translate-x-15">
              <Image
                loading="lazy"
                src="/dialogbox-phone.webp"
                alt="bubble"
                width={300}
                height={300}
                className="relative z-10"
                draggable={false}
              />

              <div className="absolute inset-0 flex items-center bottom-10 justify-center z-30">
                <Link
                  href="https://gravitas.vit.ac.in/events/e3dd00a8-fc7f-433a-9bfa-3d20c3d5bdd0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="hover:scale-110 transition-transform">
                    <span className="text-5xl tracking-wide text-amber-100 font-pixeboy">
                      REGISTER
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Character at the bottom */}
          <Image
            src="/phone-man.webp"
            alt="character"
            width={300}
            height={300}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}