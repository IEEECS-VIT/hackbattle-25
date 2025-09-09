"use client";
import { useEffect } from "react";

export default function CustomCursor() {
  useEffect(() => {
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (isTouchDevice) return; // 🚫 Skip on mobiles/tablets

    const cursor = document.createElement("img");
    cursor.src = "/diamond-pickaxe.webp";
    cursor.style.position = "fixed";
    cursor.style.pointerEvents = "none";
    cursor.style.width = "36px";
    cursor.style.height = "36px";
    cursor.style.zIndex = "9999";
    cursor.style.transform = "translate(-40%, -40%) scaleX(-1)";
    document.body.appendChild(cursor);

    const move = (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
      cursor.remove();
    };
  }, []);

  return null;
}
