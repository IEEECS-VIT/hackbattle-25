"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SpeechBubbleIntro({ onFinish }) {
  const texts = [
    "Hey Hacker, I am Steve!",
    "There's a Battle Ahead",
    "Are You Ready?",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const assets = [
      "/phone-bg.svg",
      "/leaf1.svg",
      "/cavevines.svg",
      "/dialogbox-phone.svg",
      "/phone-man.svg",
    ];

    let loaded = 0;
    assets.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        if (loaded === assets.length) {
          setLoading(false);
        }
      };
      img.onerror = () => {
        loaded++;
        if (loaded === assets.length) {
          setLoading(false);
        }
      };
    });
  }, []);


  useEffect(() => {
    if (loading) return;

    if (currentIndex === texts.length - 1) {
      const timeout = setTimeout(() => {
        onFinish();
      }, 2000);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, [loading, currentIndex, texts.length, onFinish]);


  return (
    <div className="relative w-full h-screen overflow-hidden select-none">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
          <Image src="/loader.webp" height={0} width={0} alt="Loading..." className="w-32 h-32" />
        </div>
      )}
      {/* Background */}
      <Image
        src="/phone-bg.svg"
        alt="background"
        fill
        className="object-cover brightness-110 contrast-110"
        priority
      />

      {/* Subtle glowing overlays */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-200/15 via-teal-200/10 to-transparent animate-shine"></div>
        <div className="absolute bottom-0 inset-x-0 h-52 bg-gradient-to-t from-cyan-300/35 via-teal-400/25 to-transparent blur-3xl"></div>
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-80 h-40 bg-cyan-300/25 blur-2xl rounded-full"></div>
        <div className="absolute inset-0 bg-green-300/10 mix-blend-overlay"></div>
      </div>

      {/* Left leaves */}
      <div className="absolute top-0 left-0 z-40">
        <Image
          src="/leaf1.svg"
          alt="leaves"
          width={160}
          height={200}
          className="leaf-sway"
        />
      </div>

      {/* Right hanging vines */}
      <div className="absolute top-0 right-14 flex flex-row gap-4 z-20">
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
        
      </div>

      {/* Top-right leaves */}
      {/* <div className="absolute top-0 right-0 z-40">
        <Image
          src="/leaf1.svg"
          alt="leaf-right"
          width={150}
          height={150}
          className="leaf-sway"
        />
      </div> */}

      {/* Character + Bubble */}
      <div className="absolute top-95 left-1/3 -translate-x-1/2 flex flex-col items-center">
        {/* Bubble above Steve */}
        <div className="relative inline-block translate-x-15">
  <Image
    src="/dialogbox-phone.svg"
    alt="bubble"
    width={300}
    height={300}
    className="relative z-10"
    draggable="false"
  />
  <div className="absolute top-[5%] left-[10%] w-[80%] h-[60%] flex items-center justify-center">
    <p className="text-white text-xl tracking-wide font-pixeboy text-center whitespace-pre-line leading-snug">
      {texts[currentIndex]}
    </p>
  </div>
</div>
        {/* Character */}
        <Image src="/phone-man.svg" alt="character" width={300} height={300} draggable="false" />
      </div>
    </div>
  );
}
