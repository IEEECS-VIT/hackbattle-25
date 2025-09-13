"use client";
import { useState, useEffect } from "react";
import navbar from "./components/navbar";
import Home from "./components/LandingPage";
import About from "./components/about";
import FaqSection from "src/components/FaqSection";
import SpeechBubble from "src/app/components/SpeechBubble";
import PS from "./components/ps";
import CustomCursor from "./components/Cursor";
import SpeakerSection from "./components/speaker";
import Marquee from "./components/Marquee";

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
        <video
          src="/loader.webm"
          autoPlay
          loop
          muted
          playsInline
          alt="Loading..."
          height={128}
          width={128}
          className="w-32 h-32"
        />
      </div>
    );
  }

  return (
    <div>
      {!isMobile && <CustomCursor />}
      
      {isMobile ? (
        <>
          {!speechBubbleComplete && (
            <SpeechBubble onFinish={handleSpeechBubbleFinish} />
          )}
          {speechBubbleComplete && (
            <Home onFinish={() => setLandingLoaded(true)} />
          )}
        </>
      ) : (
        <Home onFinish={() => setLandingLoaded(true)} />
      )}

      {((isMobile && landingLoaded && speechBubbleComplete) || (!isMobile && landingLoaded)) && (
        <>
          <div className="absolute -bottom-[5vh] md:-bottom-[10vh] w-full z-10 overflow-x-clip">
        <Marquee />
      </div>
          <About />
          <PS />
          <SpeakerSection />
          <FaqSection />
        </>
      )}
    </div>
  );
}

