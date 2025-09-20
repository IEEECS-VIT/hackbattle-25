"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { loginWithGoogle, logout } from "./Google";
import Toast from "./Toast";

export default function Navbar() {
  const [user, setUser] = useState(null); // will store only accessToken
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) setUser(token);
  }, []);

  const handleLogin = () => setShowLoginModal(true);

  const handleChoice = async (type) => {
    try {
      await loginWithGoogle(type, router);
      const token = localStorage.getItem("accessToken");
      setUser(token);
      setShowLoginModal(false);
    } catch (err) {
      window.dispatchEvent(
        new CustomEvent("showToast", { detail: { text: err.message } })
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("accessToken");
      setUser(null);
      window.dispatchEvent(
        new CustomEvent("showToast", { detail: { text: "Logged out successfully" } })
      );
    } catch (error) {
      console.error("Sign-Out Error:", error);
    }
  };

  return (
    <>
      <Toast />

      {showLoginModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-6 text-center w-96">
            <button
              onClick={() => handleChoice("internal")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              Internal Participant
            </button>
            <button
              onClick={() => handleChoice("external")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
            >
              External Participant
            </button>
            <button
              onClick={() => setShowLoginModal(false)}
              className="mt-4 text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <nav className="hidden md:flex fixed top-3 left-1/2 -translate-x-1/2 items-center justify-center gap-8 px-8 py-4 bg-[#02554ACC] rounded-full shadow-lg z-30 w-[70vw]">
        <div className="flex gap-8">
          {[
            { label: "Home", path: "#home" },
            { label: "About", path: "#about" },
            { label: "Problem Statements", path: "#ps" },
            { label: "Judge", path: "#speaker" },
            { label: "FAQ", path: "#faqs" },
          ].map(({ label, path }) => (
            <a
              key={label}
              href={path}
              className="text-xl lg:text-3xl font-bold font-pixeboy text-[#f8f5c0] hover:text-white transition"
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

          <button
            onClick={user ? handleLogout : handleLogin}
            className="px-5 py-2 bg-yellow-500 text-black text-xl lg:text-2xl rounded-full hover:bg-yellow-400"
          >
            {user ? "LOGOUT" : "LOGIN"}
          </button>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="block md:hidden">
        <div className="fixed top-0 left-0 right-0 flex flex-row justify-between items-center px-6 py-4 z-30">
          <button onClick={() => setMenuOpen(true)} className=" text-3xl text-white">
            ☰
          </button>

          <button
            onClick={user ? handleLogout : handleLogin}
            className="bg-yellow-500 text-black px-4 py-2 rounded-full text-2xl font-pixeboy"
          >
            {user ? "LOGOUT" : "LOGIN"}
          </button>
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
  { icon: "/icon1.webp", label: "HOME", path: "home" },
  { icon: "/icon2.webp", label: "ABOUT", path: "about" },
  { icon: "/icon4.webp", label: "PROBLEM STATEMENTS", path: "ps" },
  { icon: "/icon4.png", label: "JUDGE", path: "speaker" },
  { icon: "/icon3.webp", label: "FAQs", path: "faqs" },
].map((item, idx) => (
  <button
    key={idx}
    onClick={() => {
      const el = document.getElementById(item.path);
      if (el) el.scrollIntoView({ behavior: "smooth" });
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
