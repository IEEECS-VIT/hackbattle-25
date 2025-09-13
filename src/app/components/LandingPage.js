"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MobileLanding from "./MobileLanding";
import Navbar from "./navbar";
import Link from "next/link";

export default function Home({ onFinish }) {
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const assets = [
      "/background.webp",
      "/phone-bg.webp",
      "/video/waterfall.webm",
      "/video/frog.webm",
      "/video/axo.webm",
      "/vine1.webp",
      "/leaf1.webp",
      "/cavevines.webp",
      "/leaf-right.webp",
      "/man.webp",
      "/discord.webp",
      "/registerborder.webp",
    ];

    let loaded = 0;

    assets.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === assets.length) {
          setLoading(false);
          if (onFinish) onFinish(); // notify parent
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === assets.length) {
          setLoading(false);
          if (onFinish) onFinish(); // notify parent
        }
      };
    });
  }, [onFinish]);

  return (
    <div className="relative select-none h-[100dvh] overflow-hidden">
      {/* Background image for desktop */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <video
            src="/loader.webm"
            alt="Loading..."
            autoPlay
            loop
            muted
            playsInline
            className="w-32 h-32"
          />
        </div>
      )}
      <Image
        src="/background.webp"
        alt="Background"
        fill
        className="object-cover hidden md:block"
        priority
        draggable="false"
      />

      {/* Background image for mobile */}
      <Image
        src="/phone-bg.webp"
        alt="Background"
        fill
        className="object-cover md:hidden"
        priority
        draggable="false"
      />

      <div className="absolute top-0 left-170 w-64 h-168 hidden md:block overflow-hidden z-0 opacity-60">
        {/* Static Waterfall Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/video/waterfall.webm"
          alt="Waterfall"
          className="w-full h-150 object-cover"
          draggable="false"
        />
      </div>

      {/* Mobile Landing Component */}
      <div className="md:hidden">
        <MobileLanding />
      </div>

      {/* Desktop */}
      <div className="hidden md:block">
        {/* Left vine + leaf */}
        <div className="absolute top-0 left-2 flex justify-center space-x-1 py-1 z-10">
          <Image
            src="/vine1.webp"
            width={410}
            height={410}
            alt="Left Vine"
            draggable="false"
          />
          <Image
            src="/leaf1.webp"
            width={220}
            height={220}
            alt="Left Leaf"
            className="absolute top-0 left-4 leaf-sway"
            draggable="false"
          />
        </div>

        {/* Navbar - Now using the separate component */}
        <Navbar />

        {/* Right vines + leaves */}
        <div className="absolute top-0 right-3 flex z-10">
          <div className="relative flex">
            {/* Vines */}
            {[250, 200, 300, 180].map((h, i) => (
              <Image
                key={i}
                src="/cavevines.webp"
                alt={`Vine ${i + 1}`}
                width={50}
                height={h}
                style={{ height: `${h}px`, width: "70px" }}
                className="object-contain vine-sway"
                draggable="false"
              />
            ))}
          </div>
        </div>

        {/* Hero section */}
        <section className="relative w-[50vw] z-10 flex flex-col items-center text-center mt-10">
          <div className="z-10 font-pixeboy text-[20vh] leading-none [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] animate-glow-pulse">
            HACK
          </div>
          <div className="z-10 font-pixeboy text-[20vh] leading-none [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] animate-glow-pulse">
            BATTLE
          </div>
          <div className="z-10 font-pixeboy text-6xl mt-4 animate-glow-pulse">
            JOIN THE ULTIMATE
          </div>
          <div className="z-10 font-pixeboy text-6xl mt-2 animate-glow-pulse">
            36 hour Hackathon
          </div>

          {/* Register button */}
          <div className="relative b mt-6">
            <Link
              href="https://gravitas.vit.ac.in/events/e3dd00a8-fc7f-433a-9bfa-3d20c3d5bdd0"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="hover:scale-110  transition">
                <Image
                  src="/reg.webp"
                  alt="Register"
                  width={350}
                  height={400}
                  className="w-48 sm:w-64 lg:w-80"
                  draggable="false"
                />
              </button>
            </Link>
          </div>
        </section>

        {/* Characters */}
        <div className="absolute bottom-45 right-[8%] -translate-x-1/2 z-10">
          <Image
            src="/man.webp"
            alt="Hero"
            width={350}
            height={900}
            draggable="false"
            className="w-40 sm:w-56 lg:w-80"
          />
        </div>
        <div className="absolute bottom-58 right-3 -translate-x-1/2 z-10">
          <video
            src="/video/frog.webm"
            autoPlay
            loop
            muted
            playsInline
            className="w-30 h-full"
          />
        </div>

        <div className="absolute bottom-10 right-19 -translate-x-1/2 z-10">
          <video
            src="/video/axo.webm"
            alt="Creature2"
            autoPlay
            loop
            muted
            playsInline
            className="w-30 h-full"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}


