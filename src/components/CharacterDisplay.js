'use client';

import React from 'react';

export default function CharacterDisplay({ characterSrc, className, style }) {
  return (
    <div className="relative w-full max-w-xs mx-auto aspect-square">
      <video
        key={characterSrc} 
        src={characterSrc}

        autoPlay
        loop
        muted
        playsInline

        className={`absolute top-0 left-0 w-full h-full object-contain select-none animate-fade-in-out ${className}`}
        style={style}
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
      />
    </div>
  );
}