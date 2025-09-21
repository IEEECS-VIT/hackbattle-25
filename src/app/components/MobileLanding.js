"use client";

import Image from "next/image";
import MinecraftTimer from "./Timer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPagePhone() {
  const [user, setUser] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const router=useRouter();
  
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
    <div className="relative h-[100dvh] w-full overflow-hidden text-white font-pixeboy select-none" id="home">
      {/* Background */}
      <Image
        src="/landing-bg.webp"
        alt="Background"
        fill
        priority
        className="object-cover"
        draggable={false}
      />

      {/* Waterfall */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center w-64 h-full overflow-hidden z-0 opacity-60">
        <Image
          src="/waterfall.gif"
          alt="Waterfall"
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full text-center">
        {/* Heading */}
        <section className="flex flex-col items-center font-pixeboy mt-6">
          <div className="text-8xl [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] leading-tight">
            Hack
          </div>
          <div className="text-8xl -mt-4 [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] leading-tight">
            BATTLE
          </div>
          <div className="text-4xl mt-2">THE ULTIMATE</div>
          <div className="text-4xl -mt-1">36 hour HACKATHON</div>
        </section>

        {/* Timer */}
        <div className="flex justify-center h-[15vh]">
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

        <div className="relative w-full flex justify-start items-end">
  <Image
    src="/phone-man.webp"
    alt="character"
    height={0}
    width={0}
    sizes="100vh"
    className="h-[40vh] w-auto object-contain"
    draggable={false}
  />
</div>


      </div>
    </div>
  );
}
