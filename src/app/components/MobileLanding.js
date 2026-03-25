"use client";

import Image from "next/image";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginWithGoogle, logout } from "./Google";

export default function LandingPagePhone() {
  const [user, setUser] = useState(null);
  const [userStatus, setUserStatus] = useState(null);
  const router = useRouter();
  const handleLogin = async () => {
    try {
      await loginWithGoogle("internal", router);
    } catch (err) {
      console.error(err);
    }
  };
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUser(token);
  }, []);

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
      <div className="relative z-10 flex flex-col items-center justify-start h-full text-center">
        {/* Heading */}
        <section className="flex flex-col items-center font-pixeboy mt-16">
          <div className="text-7xl [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] leading-tight">
            INTERNAL
          </div>

          <div className="text-7xl -mt-8 [text-shadow:4px_4px_4px_var(--tw-shadow-color)] shadow-[#FFF58C] text-[#F3EDCB] leading-tight">
            HACK
          </div>

          <div className="mt-6 flex gap-4 z-20">
            {user ? (
              <>
                <button
                  onClick={handleRedirect}
                  className="px-6 py-3 text-lg bg-[#02554A] text-white rounded-xl shadow-lg hover:scale-105 transition"
                >
                  DASHBOARD
                </button>

                <button
                  onClick={handleLogout}
                  className="px-4 py-3 text-lg bg-red-500 text-white rounded-xl shadow-lg hover:scale-105 transition"
                >
                  LOGOUT
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="px-8 py-3 text-lg bg-[#F3EDCB] text-[#02554A] rounded-xl shadow-lg hover:scale-105 hover:bg-white transition"
              >
                LOGIN
              </button>
            )}
          </div>
        </section>

       {/* <div className="relative w-full flex justify-start items-end">
          <Image
            src="/phone-man.webp"
            alt="character"
            height={0}
            width={0}
            sizes="100vh"
            className="h-[40vh] w-auto object-contain"
            draggable={false}
          />
        </div> */}
      </div>
    </div>
  );
}
