"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import MobileLanding from "./MobileLanding";
import MinecraftTimer from "./Timer";
import { useRouter } from "next/navigation";

export default function Home({ onFinish }) {
  const [loading, setLoading] = useState(true); // tracks asset loading
  const [forcePlayOnce, setForcePlayOnce] = useState(true); // ensures video plays once
  const [user, setUser] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const router=useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUser(token);
  }, []);

  useEffect(() => {
    const assets = [
      "/background.webp",
      "/phone-bg.webp",
      "/waterfall.gif",
      "/video/frog.webm",
      "/video/axo.webm",
      "/vine1.webp",
      "/leaf1.webp",
      "/cavevines.webp",
      "/leaf-right.webp",
      "/man.webp",
      "/discord.webp",
    ];

    let loaded = 0;

    assets.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === assets.length) {
          setLoading(false);
          if (onFinish) onFinish();
        }
      };
    });
  }, [onFinish]);

  useEffect(() => {
    const status = localStorage.getItem("UserStatus");
    if (status === "true" || status === "false") setUserStatus(status);
  }, []);
  
  const handleRedirect = () => {
    if (userStatus === "true") {
      router.push("/team");
    } else if (userStatus === "false") {
      router.push("/dashboard");
    }
  };
  
  return (
    <div className="relative select-none h-[100dvh] overflow-hidden" id="home">
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

      <Image
        src="/phone-bg.webp"
        alt="Background"
        fill
        className="object-cover md:hidden"
        priority
        draggable="false"
      />

      <div className="absolute top-0 left-170 w-64 h-168 hidden md:block overflow-hidden z-0 opacity-60">
        <Image
          height={0}
          width={0}
          src="/waterfall.gif"
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

        {/* Right vines + leaves */}
        <div className="absolute top-0 right-3 flex z-10">
          <div className="relative flex">
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
        <section className="relative w-[50vw] z-10 flex flex-col items-center text-center mt-32">
          <div className="z-10 font-pixeboy text-[16vh] leading-none [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] animate-glow-pulse">
            HACKBATTLE
          </div>
          {/* <div className="z-10 font-pixeboy text-[12vh] leading-none [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] animate-glow-pulse">
            BATTLE
          </div> */}
          <div className="z-10 text-[5vh] font-pixeboy mt-8 animate-glow-pulse">
            THE ULTIMATE 36 hour Hackathon
          </div>
          <div className="z-10 text-[5vh] font-pixeboy mt-0 animate-glow-pulse">
            starts in ...
          </div>
          {/* <div className="z-10 font-pixeboy text-6xl mt-2 animate-glow-pulse">
            
          </div> */}

          <div className="relative b mt-6">
            <MinecraftTimer />
          </div>

            {user && (
            <button
            onClick={handleRedirect}
            className="px-6 py-3 bg-red-600 text-white font-pixeboy text-xl rounded-md hover:bg-red-700 transition"
          >
            {userStatus ? "Go to Team Page" : "Go to Dashboard"}
          </button>
          )}
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
          <Image
          width={0}

height={0}            src="/video/frog.gif"
alt="frog"
            className="w-30 h-full"
          />
        </div>
        <div className="absolute bottom-10 right-19 -translate-x-1/2 z-10">
          <Image
          width={0}
          height={0}
            src="/video/axo.gif"
            alt="axo"
            className="w-30 h-full"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
}
