"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function LandingPagePhone() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-white font-pixeboy select-none">
      {/* Background */}
      <Image
        src="/landing-bg.svg"
        alt="Background"
        fill
        priority
        className="object-cover"
        draggable={false}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center w-64 h-[100vh] overflow-hidden z-0 opacity-60">
        <Image
          src="/video/waterfall.gif"
          alt="Waterfall"
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-30">
        {/* Menu button */}
        <button onClick={() => setMenuOpen(true)} className=" text-3xl">
          ☰
        </button>

        {/* Login button */}
        {/* <button
          onClick={() => router.push("/login")}
          className="bg-[url('/wood-texture.svg')] bg-cover text-black px-4 py-2 rounded-lg text-2xl font-pixeboy"
        >
          LOGIN
        </button> */}
      </div>

      {/* Sidebar Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30"
        />
      )}

      {/* Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[100vw] overflow-x-hidden z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Borders */}
        <div className="absolute inset-0 z-50 pointer-events-none flex justify-between">
          <div className="h-full w-8 bg-[url('/border.svg')] bg-repeat-y bg-left bg-contain"></div>
          <div className="h-full w-8 bg-[url('/border.svg')] bg-repeat-y bg-right bg-contain"></div>
        </div>

        {/* Sidebar content */}
        <div className="h-full w-full bg-[url('/menu-bg.svg')] bg-cover top- flex flex-col p-6 relative z-40">
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="text-5xl text-white absolute top-6 right-6 z-50"
          >
            ✕
          </button>

          {/* Menu Items */}
          <div className="flex items-center select-none flex-col gap-6 mt-16">
            {[
              { icon: "/icon1.svg", label: "HOME", path: "/" },
              { icon: "/icon2.svg", label: "ABOUT", path: "/#about" },
              { icon: "/icon4.svg", label: "PROBLEM STATEMENTS", path: "/#ps" },
              { icon: "/icon4.svg", label: "SPEAKER", path: "/#speaker" },
              { icon: "/icon3.svg", label: "FAQs", path: "/#faqs" },
              // { icon: "/icon5.svg", label: "TIMELINE", path: "/timeline" },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  router.push(item.path);
                  setMenuOpen(false); // ✅ close sidebar
                }}
                className=" flex items-center w-full"
              >
                {/* Icon Frame */}
                <div className="w-24 h-32 bg-[url('/wood-frame.svg')] bg-cover top-20 flex items-center justify-center">
                  <Image
                    loading="lazy"
                    src={item.icon}
                    alt={item.label}
                    width={96}
                    height={96}
                    className="object-contain"
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>

                {/* Text Button */}
                <div className="flex-1 h-16 bg-[url('/wood-button.svg')] bg-cover flex items-center justify-center text-amber-100 font-pixeboy text-3xl">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

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
                src="/dialogbox-phone.svg"
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
            src="/phone-man.svg"
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
