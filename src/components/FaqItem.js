'use client';

import React, { useState, useEffect } from 'react';
import { VT323 } from 'next/font/google';
import FaqItem from '../components/FaqItem';
import CharacterDisplay from '../components/CharacterDisplay';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

const Fireflies = () => {
  const fireflyCount = 25;
  const [fireflies, setFireflies] = useState([]);

  useEffect(() => {
    const generatedFireflies = Array.from({ length: fireflyCount }).map((_, i) => {
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 2}px`,
        height: `${Math.random() * 3 + 2}px`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      return <span key={i} className="firefly" style={style}></span>;
    });
    setFireflies(generatedFireflies);
  }, []);

  return <div className="absolute top-0 left-0 w-full h-full z-0">{fireflies}</div>;
};

export default function FaqSection() {
  
  const [openIndex, setOpenIndex] = useState(null);
  const [currentCharacter, setCurrentCharacter] = useState({ src: '/Blaze.webm', style: {} }); 

  const pathname = usePathname();

  const faqData = [
    { question: "What is Hack Battle?", answer: "A gamified hackathon...", headImageSrc: "/minecraft-head-steve.jpeg", characterWebM: "/Steve.webm", characterStyle: { transform: 'translateY(110px) scale(2.0)' } },
    { question: "Do I need Minecraft to join?", answer: "Nope! The theme is...", headImageSrc: "/minecraft-head-alex.jpeg", characterWebM: "/Alex.webm", characterStyle: { transform: 'translateY(100px) translateX(20px) scale(2.0)' } },
    { question: "How do I register?", answer: "Click the 'Register' button...", headImageSrc: "/minecraft-head-chicken.jpeg", characterWebM: "/Chicken.webm", characterStyle: { transform: 'translateY(158px) translateX(10px) scale(1.2)'} }, 
    { question: "Is Hackbattle fresher friendly?", answer: "Absolutely!, this is YOUR launchpad.", headImageSrc: "/minecraft-head-creeper.jpeg", characterWebM: "/Creeper.webm", characterStyle: { transform: 'translateY(200px) translateX(20px) scale(1.2)' } },
    { question: "What should i bring?", answer: "Your laptop, extention cord...", headImageSrc: "/minecraft-head-piglin.jpg", characterWebM: "/Piglin.webm", characterStyle: { transform: 'translateY(170px) translateX(-40px) scale(1.2)' } },
    { question: "Is there a team size limit?", answer: "Teams can consist of 2-4 members.", headImageSrc: "/minecraft-head-zombie.jpeg", characterWebM: "/Zombie.webm", characterStyle: { transform: 'translateY(155px) translateX(-50px) scale(1.2)' } },
  ];

  const toggleItem = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
      setCurrentCharacter({ src: '/Blaze.webm', style: {} });
    } else {
      setOpenIndex(index);
      setCurrentCharacter({ 
        src: faqData[index].characterWebM, 
        style: faqData[index].characterStyle || {} 
      });
    }
  };

  return (
    <section id="faqs">
      <div
        className={`relative min-h-screen w-full flex flex-col items-center p-4 bg-[url('/faq-background.svg')] bg-cover bg-center text-white overflow-hidden ${vt323.className}`}
      >
        <Fireflies />

        <div className="flex justify-center items-center gap-4 mt-8">
            <h1 className="text-6xl md:text-8xl font-bold text-[#f2e5a6] [text-shadow:3px_3px_#3a1d0c] animate-glow-pulse">
              FAQs
            </h1>
            <Image 
              src="/question.svg"
              alt="Question Mark"
              width={64}
              height={64}
            />
        </div>

        <main className="w-full mx-auto flex flex-col items-center z-10 p-4 md:flex-row md:items-start md:justify-between md:px-12">
          
          <div className="hidden md:flex md:w-1/3 md:items-end md:justify-center">
            <div className="w-full mt-35">
              <CharacterDisplay 
                characterSrc={currentCharacter.src} 
                style={currentCharacter.style}
                className={currentCharacter.src === '/Blaze.webm' ? 'transform scale-x-[-1]' : ''}
              />
            </div>
          </div>

          <div className="space-y-2 w-full md:flex-1">
            {faqData.map((item, index) => (
              <FaqItem
                key={index}
                question={item.question}
                answer={item.answer}
                headImageSrc={item.headImageSrc}
                isOpen={openIndex === index}
                toggleItem={() => toggleItem(index)}
              />
            ))}
          </div>
        </main>
      </div>
    </section>
  );
}