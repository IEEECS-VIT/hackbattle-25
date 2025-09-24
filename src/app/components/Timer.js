import React, { useState, useEffect } from 'react';

const hackStartTime = new Date('2025-09-24T08:00:00');
const events = [
  { name: 'Review 1', time: new Date('2025-09-24T16:00:00') },
  { name: 'Review 2', time: new Date('2025-09-25T02:30:00') },
  { name: 'Review 3', time: new Date('2025-09-25T15:00:00') },
  { name: 'Final Pitches', time: new Date('2025-09-25T17:00:00') }
];

function getInitialEventIndex(now, events) {
  const idx = events.findIndex(e => e.time.getTime() > now.getTime());
  return idx === -1 ? events.length : idx;
}

export default function HackathonTimer() {
  const now = new Date();

  const [currentEventIndex, setCurrentEventIndex] = useState(() =>
    getInitialEventIndex(now, events)
  );
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [phase, setPhase] = useState(() => {
    if (now < hackStartTime) return 'preHack';
    if (currentEventIndex >= events.length) return 'ended';
    return 'event';
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      if (phase === 'preHack') {
        const diff = hackStartTime.getTime() - now.getTime();
        if (diff <= 0) {
          setPhase('event');
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft({ hours, minutes, seconds });
        }
      } else if (phase === 'event') {
        if (currentEventIndex >= events.length) {
          setPhase('ended');
          return;
        }

        const diff = events[currentEventIndex].time.getTime() - now.getTime();
        if (diff <= 0) {
          setCurrentEventIndex(prev => {
            if (prev < events.length - 1) {
              return prev + 1;
            } else {
              setPhase('ended');
              return prev;
            }
          });
        } else {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          setTimeLeft({ hours, minutes, seconds });
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, currentEventIndex]);

  const TimeBlock = ({ value, label, color }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div
        className={`${color} p-4 sm:p-6 relative transform transition-transform hover:scale-105`}
        style={{
          boxShadow:
            'inset 4px 4px 0px rgba(205, 133, 63, 0.8), inset -4px -4px 0px rgba(93, 78, 55, 0.8), 0 8px 16px rgba(0, 0, 0, 0.3)',
          textShadow: '2px 2px 0px rgba(0, 0, 0, 0.8)'
        }}
      >
        <div className="text-3xl font-bold text-white text-center leading-none">
          {String(value).padStart(2, '0')}
        </div>
      </div>
      <div className="mt-3 text-yellow-300 text-xl font-bold uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  let labelText = '';
  if (phase === 'preHack') labelText = 'Hack starts in...';
  else if (phase === 'event') labelText = `${events[currentEventIndex].name} starts in...`;
  else labelText = 'Hack has ended!';

  return (
    <div className="w-full relative h-auto font-pixeboy">
      <div className="text-2xl text-[5vh] font-pixeboy mt-8 animate-glow-pulse">
        THE ULTIMATE 36 HOUR HACKATHON
      </div>
      <div className="text-xl my-2">{labelText}</div>
      {phase !== 'ended' && (
        <div className="flex justify-center items-center gap-1 flex-nowrap">
          <TimeBlock value={timeLeft.hours} label="HOURS" color="bg-blue-600 hover:bg-blue-500" />
          <div className="text-yellow-400 text-4xl sm:text-5xl font-bold mx-2 animate-pulse">:</div>
          <TimeBlock value={timeLeft.minutes} label="MINUTES" color="bg-purple-600 hover:bg-purple-500" />
          <div className="text-yellow-400 text-4xl sm:text-5xl font-bold mx-2 animate-pulse">:</div>
          <TimeBlock value={timeLeft.seconds} label="SECONDS" color="bg-red-600 hover:bg-red-500" />
        </div>
      )}
    </div>
  );
}
