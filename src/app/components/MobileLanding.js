"use client";

import Image from "next/image";
import MinecraftTimer from "./Timer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LandingPagePhone() {
  const [user, setUser] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const router = useRouter();
 useEffect(() => {
   const storedUser = localStorage.getItem("user");
   if (storedUser) setUser(JSON.parse(storedUser));

   const status = localStorage.getItem("UserStatus");
   if (status === "true" || status === "false") setUserStatus(status);
 }, []);


 useEffect(() => {
  const status = localStorage.getItem("UserStatus");
  setUserStatus(status);
}, []);

  const handleRedirect = () => {
    if (userStatus === "true") {
      router.push("/team");
    } else if (userStatus === "false") {
      router.push("/dashboard");
    }
  };
  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden text-white font-pixeboy select-none"
      id="home"
    >
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
        <section className="flex flex-col items-center font-pixeboy mt-16">
          <div>
                      <Image
                        src="/bob.png"
                        alt="Discord"
                        width={200}
                        height={200}
                        draggable="false"
                        className=""
                      />
                    </div>
                    <div className="leading-none [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] animate-glow-pulse mt-4">
            presents
          </div>
          <div className="text-8xl [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] leading-tight">
            Hack
          </div>
          <div className="text-8xl -mt-8 [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] leading-tight">
            BATTLE
          </div>
          <div className="text-2xl mt-2">THE ULTIMATE</div>
          <div className="text-2xl -mt-1">36 hour HACKATHON</div>
          <div className="text-xl my-2">starts in...</div>

        </section>

        {/* Timer */}
        <div className="flex justify-center h-[15vh]">
          <MinecraftTimer />
        </div>
         {userStatus && (
          <div className="w-[50vw] ml-[12vw] mt-[2vh] flex justify-start">
          <button
            onClick={handleRedirect}
            className="px-6 py-3 bg-yellow-600 text-white font-pixeboy text-xl rounded-md hover:bg-yellow-700"
          >
              {userStatus=="true" ? "Go to Team Page" : "Go to Dashboard"}
          </button>
        </div>
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
