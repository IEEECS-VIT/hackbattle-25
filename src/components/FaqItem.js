'use client'; 

import React from 'react';
import { VT323 } from 'next/font/google';
import Image from 'next/image';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export default function FaqItem({ question, answer, headImageSrc, isOpen, toggleItem }) {

  const boxStyles = "bg-[#103818]/80 backdrop-blur-sm border-8 border-[#081c0c] shadow-[inset_0_0_0_6px_#225c3c] rounded-2xl transition-all duration-350 ease-in-out hover:scale-[1.02] hover:bg-[#043927]/90 hover:border-[#327a50] cursor-pointer";
  const minecraftBoxClipPath = "[clip-path:polygon(0px_16px,_8px_16px,_8px_8px,_16px_8px,_16px_0px,_calc(100%_-_16px)_0px,_calc(100%_-_16px)_8px,_calc(100%_-_8px)_8px,_calc(100%_-_8px)_16px,_100%_16px,_100%_calc(100%_-_16px),_calc(100%_-_8px)_calc(100%_-_16px),_calc(100%_-_8px)_calc(100%_-_8px),_calc(100%_-_16px)_calc(100%_-_8px),_calc(100%_-_16px)_100%,_16px_100%,_16px_calc(100%_-_8px),_8px_calc(100%_-_8px),_8px_calc(100%_-_16px),_0px_calc(100%_-_16px))]";

  return (
    <div className={`${boxStyles} select-none py-4 px-7 ${minecraftBoxClipPath} ${vt323.className}`}>
      <div className="flex justify-between items-center" onClick={toggleItem}>
        <div className="flex items-center gap-4">
          {headImageSrc && (
            <Image 
              loading='lazy'
              src={headImageSrc}
              width={64}
              height={64} 
              alt="Minecraft head" 
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className="w-12 h-12 md:w-16 md:h-16 object-contain select-none"
            />
          )}
          <h2 className="text-3xl text-[#f2e5a6] [text-shadow:2px_2px_#3a1d0c] animate-faq-title-glow cursor-pointer">
            {question}
          </h2>
        </div>
      </div>
      {isOpen && (
        <p className="text-2xl leading-relaxed text-[#c8d4a6] mt-4 transition-all duration-300 ease-in-out">
          {answer}
        </p>
      )}
    </div>
  );
}