"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return;

    const cursor = document.createElement("img");
    
    // SVG pickaxe as fallback (works everywhere)
  const pickaxeSvg =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Crect x='8' y='2' width='3' height='24' fill='%238B4513'/%3E%3Cpolygon points='6,4 10,8 6,8' fill='%23FFD700'/%3E%3Crect x='6' y='8' width='8' height='3' fill='%23FFD700'/%3E%3C/svg%3E";

    
    cursor.src = pickaxeSvg;
    
    // Try to load WebP if supported, otherwise use SVG
    const supportsWebP = () => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      return canvas.toDataURL("image/webp").indexOf("image/webp") === 5;
    };

    if (supportsWebP()) {
      cursor.src = "/diamond-pickaxe.webp";
      cursor.onerror = () => {
        cursor.src = pickaxeSvg; // Fallback to SVG if WebP fails
      };
    }
    
    cursor.style.position = "fixed";
    cursor.style.pointerEvents = "none";
    cursor.style.width = "36px";
    cursor.style.height = "36px";
    cursor.style.zIndex = "9999";
    cursor.style.transform = "translate(-40%, -40%) scaleX(-1)";
    cursor.style.transition = "transform 0.1s ease";
    cursor.style.willChange = "transform";
    cursor.style.imageRendering = "crisp-edges";
    document.body.appendChild(cursor);

    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes pickaxeHit {
        0%   { transform: translate(-40%, -40%) scaleX(-1) rotate(0deg); }
        15%  { transform: translate(-40%, -40%) scaleX(-1) rotate(15deg); }
        30%  { transform: translate(-40%, -40%) scaleX(-1) rotate(0deg); }
        45%  { transform: translate(-40%, -40%) scaleX(-1) rotate(30deg); }
        60%  { transform: translate(-40%, -40%) scaleX(-1) rotate(0deg); }
        75%  { transform: translate(-40%, -40%) scaleX(-1) rotate(45deg); }
        90%  { transform: translate(-40%, -40%) scaleX(-1) rotate(60deg); }
        100% { transform: translate(-40%, -40%) scaleX(-1) rotate(0deg); }
      }
      .triple-hit {
        animation: pickaxeHit 0.6s ease forwards;
      }
    `;
    document.head.appendChild(style);

    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };

    const down = () => {
      cursor.classList.remove("triple-hit"); 
      void cursor.offsetWidth; 
      cursor.classList.add("triple-hit");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      cursor.remove();
      style.remove();
    };
  }, []);

  return null;
}