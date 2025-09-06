"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MobileLanding from "./MobileLanding";
import Link from "next/link";

export default function Home({ onFinish }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const assets = [
      "/background.svg",
      "/phone-bg.svg",
      "/video/waterfall.gif",
      "/video/frog.gif",
      "/video/axo.gif",
      "/vine1.svg",
      "/leaf1.svg",
      "/cavevines.svg",
      "/leaf-right.svg",
      "/man.svg",
      "/discord.svg",
      "/registerborder.svg",
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
          <Image src="/loader.gif" alt="Loading..." height={0} width={0} className="w-32 h-32" />
        </div>
      )}
      <Image
        src="/background.svg"
        alt="Background"
        fill
        className="object-cover hidden md:block"
        priority
        draggable="false"
      />

      {/* Background image for mobile */}
      <Image
        src="/phone-bg.svg"
        alt="Background"
        fill
        className="object-cover md:hidden"
        priority
        draggable="false"
      />

      <div className="absolute top-0 left-170 w-64 h-168 hidden md:block overflow-hidden z-0 opacity-60">
        {/* Static Waterfall Background */}
        <Image
        width={0}
        height={0}
          src="/video/waterfall.gif"
          alt="Waterfall"
          className="w-full h-full object-cover"
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
          <Image src="/vine1.svg" width={410} height={410} alt="Left Vine" draggable="false" />
          <Image
            src="/leaf1.svg"
            width={220}
            height={220}
            alt="Left Leaf"
            className="absolute top-0 left-4 leaf-sway"
            draggable="false"
          />
        </div>

        {/* Navbar */}
        <nav className="relative flex items-center justify-between top-9 px-29 py-4 bg-[#02554ACC] rounded-full shadow-lg z-20 w-fit mx-auto">
          {/* Left links */}
          <div className="flex gap-8">
  {[
    { label: "Home" },
    { label: "About", path: "#about" },
    { label: "Problem Statements", path: "#ps" },
    { label: "Speaker", path: "#speaker" },
    { label: "FAQ", path: "#faqs" }
  ].map(({ label, path }) => (
    <a
      key={label}
      href={path}
      className="text-xl lg:text-4xl font-bold font-pixeboy text-[#f8f5c0] hover:text-white transition"
    >
      {label}
    </a>
  ))}
</div>

          <div className="flex items-center gap-4 ml-8">
            {/* Discord Icon */}
            <a
              href="https://discord.gg/your-link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1e2e24] p-2 rounded-full hover:scale-110 transition"
            >
              <Image src="/discord.svg" alt="Discord" height={0} width={0} className="w-6 h-6" />
            </a>

            {/* Login Button */}
            {/* <button className="px-5 py-2 bg-yellow-500 text-black font-pixeboy text-xl rounded-full hover:bg-yellow-400 transition">
              LOGIN
            </button> */}
          </div>
        </nav>

        {/* Right vines + leaves */}

        <div className="absolute top-0 right-3 flex z-10">
          <div className="relative flex">
            {/* Vines */}
            {[250, 200, 300, 180].map((h, i) => (
  <Image
    key={i}
    src="/cavevines.svg"
    alt={`Vine ${i + 1}`}
    width={50}
    height={h}
    style={{ height: `${h}px`, width: "70px" }}
    className="object-contain vine-sway"
    draggable="false"
  />
))}



            {/* Leaves overlay — in a row */}
            {/* <div className="absolute top-0 right-0 flex w-full max-w-full">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="relative w-4/5 h-[20vh]">
                  <Image
                    src="/leaf-right.svg"
                    alt={`Leaf ${i + 1}`}
                    fill
                    className="leaf-sway object-contain "
                    draggable="false"
                  />
                </div>
              ))}
            </div> */}
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
          <div className="z-10 font-pixeboy text-6xl mt-2 animate-glow-pulse">36 hour Hackathon</div>

          {/* Register button */}
          <div className="relative b mt-6">
            <Link href="https://gravitas.vit.ac.in/events/e3dd00a8-fc7f-433a-9bfa-3d20c3d5bdd0" target="_blank" rel="noopener noreferrer">
            <button className="hover:scale-110  transition">
              <Image
                src="/reg.svg"
                alt="Register"
                width={350}
                height={400}
                className="w-48 sm:w-64 lg:w-80"
                draggable="false"
              />
              {/* <p className="relative font-pixeboy  text-4xl bottom-15 text-amber-100 ">
                Register
              </p> */}
            </button>
            </Link>
          </div>
        </section>

        {/* Characters */}
        <div className="absolute bottom-45 right-[8%] -translate-x-1/2 z-10">
          <Image
            src="/man.svg"
            alt="Hero"
            width={350}
            height={900}
            draggable="false"
            className="w-40 sm:w-56 lg:w-80"
          />
        </div>
        <div className="absolute bottom-58 right-4 -translate-x-1/2 z-10">
          <Image
            src="/video/frog.gif"
            alt="Creature2"
            height={164}
            width={164}
            className="w-full h-full"
            draggable="false"
          />
        </div>
        <div className="absolute bottom-10 right-19 -translate-x-1/2 z-10">
          <Image
            src="/video/axo.gif"
            alt="Creature2"
            height={164}
            width={164}
            className="w-full h-full"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
