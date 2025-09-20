import React, { useState, useEffect } from 'react';

export default function MinecraftTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });

  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-09-24T08:00:00');
    
    const updateTimer = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft({ days, hours, minutes });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        setIsExpired(true);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeBlock = ({ value, label, color }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div 
        className={`${color} border-4 border-amber-900 p-4 sm:p-6 relative transform transition-transform hover:scale-105`}
        style={{
          boxShadow: 'inset 4px 4px 0px rgba(205, 133, 63, 0.8), inset -4px -4px 0px rgba(93, 78, 55, 0.8), 0 8px 16px rgba(0, 0, 0, 0.3)',
          textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)'
        }}
      >
        <div className="text-3xl font-bold text-white text-center leading-none">
          {String(value).padStart(2, '0')}
        </div>
        
        {/* Pixelated shine effect */}
        <div className="absolute top-1 left-1 w-4 h-4 bg-white opacity-30" />
        <div className="absolute top-1 left-6 w-2 h-2 bg-white opacity-20" />
      </div>
      
      <div className="mt-3 text-yellow-300 text-xl font-bold uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-center items-center gap-1 flex-nowrap">
        {isExpired ? (
          <div className="text-center">
            <div className="text-4xl sm:text-6xl font-bold text-red-400 mb-4 animate-bounce">
              TIME'S UP!
            </div>
            <div className="text-xl text-yellow-600">
              🎉 The adventure begins! 🎉
            </div>
          </div>
        ) : (
          <>
            <TimeBlock 
              value={timeLeft.days} 
              label="DAYS" 
              color="bg-orange-600 hover:bg-orange-500"
            />
            <div className="text-yellow-400 text-4xl sm:text-5xl font-bold mx-2 animate-pulse">:</div>
            
            <TimeBlock 
              value={timeLeft.hours} 
              label="HOURS" 
              color="bg-blue-600 hover:bg-blue-500"
            />
            <div className="text-yellow-400 text-4xl sm:text-5xl font-bold mx-2 animate-pulse">:</div>
            
            <TimeBlock 
              value={timeLeft.minutes} 
              label="MINUTES" 
              color="bg-purple-600 hover:bg-purple-500"
            />
          </>
        )}
      </div>
    </div>
  );
}