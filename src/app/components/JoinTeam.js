"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { createTeam, joinTeam } from "../api/team";
import Toast from "./Toast";
import { useRouter } from "next/navigation";

const Snowflakes = () => {
  const [snowflakes, setSnowflakes] = useState([]);


  useEffect(() => {
    const generatedSnowflakes = Array.from({ length: 150 }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 1 + 0.75}rem`,
        animationDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 10}s`,
      };
      const snowflakeChar = ["+", "❄", "·"][Math.floor(Math.random() * 3)];
      return (
        <span key={i} className="snowflake" style={style}>
          {snowflakeChar}
        </span>
      );
    });
    setSnowflakes(generatedSnowflakes);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
      {snowflakes}
    </div>
  );
};

const Modal = ({ title, inputLabel, buttonText, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim()) {
      onSubmit(inputValue);
      onClose();
    }
  };

  const minecraftModalClipPath =
    "[clip-path:polygon(0px_16px,_8px_16px,_8px_8px,_16px_8px,_16px_0px,_calc(100%_-_16px)_0px,_calc(100%_-_16px)_8px,_calc(100%_-_8px)_8px,_calc(100%_-_8px)_16px,_100%_16px,_100%_calc(100%_-_16px),_calc(100%_-_8px)_calc(100%_-_16px),_calc(100%_-_8px)_calc(100%_-_8px),_calc(100%_-_16px)_calc(100%_-_8px),_calc(100%_-_16px)_100%,_16px_100%,_16px_calc(100%_-_8px),_8px_calc(100%_-_8px),_8px_calc(100%_-_16px),_0px_calc(100%_-_16px))]";


  
    return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 font-pixeboy">
      <div
        className={`bg-[#0f1a2e] border-4 border-[#8be9fd] shadow-[inset_0_0_0_4px_#0a141c,0_0_20px_rgba(139,233,253,0.5)] p-8 max-w-md w-full text-center text-white ${minecraftModalClipPath}`}
      >
        <h2 className="text-4xl text-[#8be9fd] mb-6 [text-shadow:2px_2px_#0a141c,0_0_10px_rgba(139,233,253,0.8)]">
          {title}
        </h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={inputLabel}
          className="w-full bg-[#0a141c] border-2 border-[#8be9fd] text-white rounded-lg p-3 mb-6 text-xl focus:outline-none focus:ring-2 focus:ring-[#8be9fd]"
        />
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-cyan-600 text-white py-3 rounded-lg text-xl hover:bg-cyan-700 transition-colors border-2 border-cyan-400"
          >
            {buttonText}
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white py-3 rounded-lg text-xl hover:bg-gray-800 transition-colors border-2 border-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default function JoinTeam() {
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: { text: "Please login first" },
        })
      );

      setTimeout(() => {
        router.replace("/");
      }, 1200);
    }
  }, [router]);

  useEffect(() => {
    const preload = async () => {
      const assets = [
        "/create-join.webp",
        "/mob-dash.webp",
        "/create_team_base.svg",
        "/join_team_base.svg",
        "/loader.webm",
      ];

      const promises = assets.map(
        (src) =>
          new Promise((resolve) => {
            if (src.endsWith(".webm")) {
              const video = document.createElement("video");
              video.src = src;
              video.oncanplaythrough = resolve;
            } else {
              const img = new window.Image();
              img.src = src;
              img.onload = resolve;
            }
          })
      );

      await Promise.all(promises);
      setLoading(false);
    };

    preload();
  }, []);

  const handleJoinTeam = async (code) => {
    try {
      setLoading(true);

      const result = await joinTeam(code);

      if (result.status == 200) {
        setLoading(false);
        localStorage.setItem("UserStatus", "true");
        window.dispatchEvent(
          new CustomEvent("showToast", {
            detail: { text: "Team Joined Successfully" },
          })
        );
        router.push("/team");
      } else if (result.status == 201) {
        setLoading(false);
        window.dispatchEvent(
          new CustomEvent("showToast", {
            detail: { text: "You are already in a team." },
          })
        );
      }
    } catch (err) {
      setLoading(false);

      const status = err.response?.status;

      if (status === 404 || status === 400) {
        window.dispatchEvent(
          new CustomEvent("showToast", {
            detail: { text: "Invalid Team Code" },
          })
        );
      } else if (status === 208) {
        window.dispatchEvent(
          new CustomEvent("showToast", {
            detail: {
              text: "Team already has 4 members (maximum limit reached)",
            },
          })
        );
      } else {
        window.dispatchEvent(
          new CustomEvent("showToast", {
            detail: { text: "Something went wrong. Try again." },
          })
        );
      }
    }
  };

  const handleCreateTeam = async (name) => {
    setLoading(true);

    const result = await createTeam(name);
    if (result.status == 208) {
    setLoading(true);
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: { text: "Team name already taken" },
        })
      );
    } else if (result.status == 201) {
    setLoading(false);
      localStorage.setItem("UserStatus", "true");
      window.location.href = "/team";
    } else if (result.status == 200) {
    setLoading(false);
      window.dispatchEvent(
        new CustomEvent("showToast", {
          detail: { text: "You are already in a team." },
        })
      );
    }
  };

  const playSound = () => {
    const audio = new Audio("/Glass_dig2.ogg");
    audio.play();
  };
 useEffect(() => {
   const token = localStorage.getItem("accessToken");

   if (!token) {
     window.dispatchEvent(
       new CustomEvent("showToast", {
         detail: { text: "Please login first" },
       })
     );

     setTimeout(() => {
       router.replace("/");
     }, 1200);
   } else {
     setIsLoggedIn(true);
   }

   setIsAuthChecked(true);
 }, [router]);
 if (!isAuthChecked) return null;
 if (!isLoggedIn) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
        <video
          src="/loader.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-32 h-32"
        />
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen flex flex-col items-center justify-center p-4 text-white font-pixeboy overflow-hidden">
      <Toast />
      <Image
        src="/create-join.webp"
        alt="Background"
        fill
        className="hidden md:block object-cover"
        priority
        draggable={false}
      />
      <Image
        src="/mob-dash.webp"
        alt="Background"
        fill
        className="block md:hidden object-cover"
        priority
        draggable={false}
      />
      <Snowflakes />

      <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 z-10">
        <div
          className="cursor-pointer group"
          onClick={() => {
            playSound();
            setModal("create");
          }}
        >
          <Image
            src="/create_team_base.svg"
            alt="Create Team Base"
            width={400}
            height={400}
            className="transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          />
        </div>

        <div
          className="cursor-pointer group"
          onClick={() => {
            playSound();
            setModal("join");
          }}
        >
          <Image
            src="/join_team_base.svg"
            alt="Join Team Base"
            width={400}
            height={400}
            className="transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          />
        </div>
      </div>

      {modal === "create" && (
        <Modal
          title="Create a New Team"
          inputLabel="Enter your team name..."
          buttonText="Create Team"
          onClose={() => setModal(null)}
          onSubmit={handleCreateTeam}
        />
      )}
      {modal === "join" && (
        <Modal
          title="Join an Existing Team"
          inputLabel="Enter the team code..."
          buttonText="Join Team"
          onClose={() => setModal(null)}
          onSubmit={handleJoinTeam}
        />
      )}
    </div>
  );
}
