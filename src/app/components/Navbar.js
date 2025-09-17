"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { loginWithGoogle, logout, auth } from "./Google";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuOpen]);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const userData = await loginWithGoogle();
      setUser(userData);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-1/2 -translate-x-1/2 items-center justify-center gap-8 px-8 py-4 bg-[#02554ACC] rounded-full shadow-lg z-30 w-[70vw]">
        <div className="flex gap-8">
          {[
            { label: "Home", path: "/" },
            { label: "About", path: "#about" },
            { label: "Problem Statements", path: "#ps" },
            { label: "Speaker", path: "#speaker" },
            { label: "FAQ", path: "#faqs" },
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
          <a
            href="https://discord.gg/Qj2qyYQXBF"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1e2e24] p-2 rounded-full hover:scale-110 transition"
          >
            <Image src="/discord.webp" alt="Discord" height={24} width={24} />
          </a>

          {/* <button
            onClick={user ? handleLogout : handleLogin}
            className="px-5 py-2 bg-yellow-500 text-black text-xl lg:text-2xl rounded-full hover:bg-yellow-400 transition"
          >
            {user ? "LOGOUT" : "LOGIN"}
          </button> */}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="block md:hidden">
        <div className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-6 py-4 z-30">
          <button onClick={() => setMenuOpen(true)} className=" text-3xl">
            ☰
          </button>

          {/* <button
            onClick={user ? handleLogout : handleLogin}
            className="bg-yellow-500 text-black px-4 py-2 rounded-full text-2xl font-pixeboy"
          >
            {user ? "LOGOUT" : "LOGIN"}
          </button> */}
        </div>

        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30"
          />
        )}

{menuOpen && (
  <div className="fixed top-0 left-0 h-[100dvh] w-[100vw] z-40 transform transition-transform duration-300">
    {/* Borders */}
    <div className="absolute inset-0 z-50 pointer-events-none flex justify-between">
      <div className="h-full w-8 bg-[url('/border.webp')] bg-repeat-y bg-left bg-contain"></div>
      <div className="h-full w-8 bg-[url('/border.webp')] bg-repeat-y bg-right bg-contain"></div>
    </div>

    {/* Sidebar */}
    <div className="h-full w-full bg-[url('/menu-bg.webp')] bg-cover flex flex-col p-6 relative z-40 overflow-y-auto">
      <button
        onClick={() => setMenuOpen(false)}
        className="text-5xl text-white absolute top-6 right-6 z-50"
      >
        ✕
      </button>

      <div className="flex items-center select-none flex-col gap-6 mt-16 pb-20">
        {[
          { icon: "/icon1.webp", label: "HOME", path: "/" },
          { icon: "/icon2.webp", label: "ABOUT", path: "/#about" },
          { icon: "/icon4.webp", label: "PROBLEM STATEMENTS", path: "/#ps" },
          { icon: "/icon4.png", label: "SPEAKER", path: "/#speaker" },
          { icon: "/icon3.webp", label: "FAQs", path: "/#faqs" },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => {
              router.push(item.path);
              setMenuOpen(false);
            }}
            className="flex items-center w-full"
          >
            <div className="w-24 h-32 bg-[url('/wood-frame.webp')] bg-cover flex items-center justify-center">
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

            <div className="flex-1 h-16 bg-[url('/wood-button.webp')] bg-cover flex items-center justify-center text-amber-100 font-pixeboy text-3xl">
              {item.label}
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
)}

      </div>
    </>
  );
}
