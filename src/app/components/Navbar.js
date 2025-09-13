import Image from "next/image";
import { useState } from "react";
import { loginWithGoogle, logout } from "./Google";
import { auth } from "./Google";


export default function Navbar() {
   const [user, setUser] = useState(null);

   const handleLogin = async () => {
     try {
       const userData = await loginWithGoogle();
       setUser(userData);
       console.log("User Info:", userData);
     } catch (error) {
       console.error("Google Sign-In Error:", error);
     }
   };

   const handleLogout = async () => {
     try {
       await signOut(auth);
       setUser(null);
     } catch (error) {
       console.error("Sign-Out Error:", error);
     }
   };

  return (
    <nav className="relative flex items-center justify-between top-9 px-29 py-4 bg-[#02554ACC] rounded-full shadow-lg z-20 w-fit mx-auto">
      {/* Left links */}
      <div className="flex gap-8">
        {[
          { label: "Home" },
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
        {/* Discord Icon */}
        <a
          href="https://discord.gg/Qj2qyYQXBF"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1e2e24] p-2 rounded-full hover:scale-110 transition"
        >
          <Image
            src="/discord.webp"
            alt="Discord"
            height={0}
            width={0}
            className="w-6 h-6"
          />
        </a>



        {/* Login Button */}
        {/*  <button
        onClick={user ? handleLogout : handleLogin}
        className="px-5 py-2 bg-yellow-500 text-black text-xl lg:text-2xl rounded-full hover:bg-yellow-400 transition"
      >  
        {user ? "LOGOUT" : "LOGIN"} 
      </button> */}
      </div>
    </nav>
  );
}
