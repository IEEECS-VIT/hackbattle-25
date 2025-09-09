"use client";
import { useState, useEffect } from "react";
import Home from "./components/LandingPage";
import About from "./components/about";
import FaqSection from "src/components/FaqSection";
import SpeechBubble from "src/app/components/SpeechBubble";
import PS from "./components/ps";
import CustomCursor from "./components/Cursor";
import JoinTeam from "src/app/components/JoinTeam";
import SpeakerSection from "./components/speaker";
import Image from "next/image";

export default function Page() {
  const [speechBubbleComplete, setSpeechBubbleComplete] = useState(false);
  const [landingLoaded, setLandingLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cookieChecked, setCookieChecked] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener("resize", handleResize);

    const cookies = document.cookie.split("; ").find((row) =>
      row.startsWith("speechBubbleSeen=")
    );
    if (cookies) {
      setSpeechBubbleComplete(true);
    }
    setCookieChecked(true);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSpeechBubbleFinish = () => {
    const expiry = new Date();
    expiry.setTime(expiry.getTime() + 24 * 60 * 60 * 1000);
    document.cookie = `speechBubbleSeen=true; expires=${expiry.toUTCString()}; path=/`;
    setSpeechBubbleComplete(true);
  };

  if (!cookieChecked) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <Image src="/loader.webp" alt="Loading..." height={128} width={128} className="w-32 h-32" />
      </div>
    );
  }

  return (
    <div>
      <div className="hidden md:block">
        <CustomCursor />
      </div>
      
      <div className="block md:hidden">
        {!speechBubbleComplete ? (
          <SpeechBubble onFinish={handleSpeechBubbleFinish} />
        ) : (
          <Home onFinish={() => setLandingLoaded(true)} />
        )}
      </div>

      <div className="hidden md:block">
        <Home onFinish={() => setLandingLoaded(true)} />
      </div>

      {((isMobile && landingLoaded && speechBubbleComplete) || (!isMobile && landingLoaded)) && (
        <>
          <About />
          <PS />
          <SpeakerSection />
          <FaqSection />
          <JoinTeam />
        </>
      )}
    </div>
  );
}

