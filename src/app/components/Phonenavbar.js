"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Phonenavbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
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
          <div className="h-full w-8 bg-[url('/border.webp')] bg-repeat-y bg-left bg-contain"></div>
          <div className="h-full w-8 bg-[url('/border.webp')] bg-repeat-y bg-right bg-contain"></div>
        </div>

        {/* Sidebar content */}
        <div className="h-full w-full bg-[url('/menu-bg.webp')] bg-cover top- flex flex-col p-6 relative z-40">
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
              { icon: "/icon1.webp", label: "HOME", path: "/" },
              { icon: "/icon2.webp", label: "ABOUT", path: "/#about" },
              {
                icon: "/icon4.webp",
                label: "PROBLEM STATEMENTS",
                path: "/#ps",
              },
              { icon: "/icon4.webp", label: "SPEAKER", path: "/#speaker" },
              { icon: "/icon3.webp", label: "FAQs", path: "/#faqs" },
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
                <div className="w-24 h-32 bg-[url('/wood-frame.webp')] bg-cover top-20 flex items-center justify-center">
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
                <div className="flex-1 h-16 bg-[url('/wood-button.webp')] bg-cover flex items-center justify-center text-amber-100 font-pixeboy text-3xl">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}