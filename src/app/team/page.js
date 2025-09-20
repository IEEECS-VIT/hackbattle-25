"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { teamDetails } from "../api/team";
import { useRouter } from "next/navigation";

export default function TeamPage() {
  const [team, setTeam] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getTeamDetails = async () => {
      try {
        const result = await teamDetails();
        setTeam(result.data);
        localStorage.setItem("teamDetails", JSON.stringify(result.data));
      } catch (err) {
        console.error(err);
      }
    };
    getTeamDetails();
  }, []);

  const handleCopyCode = async () => {
    if (!team) return;
    try {
      await navigator.clipboard.writeText(team.code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  if (!team) return (
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

  const leader = team.members[0];
  const members = team.members.slice(1);

  const desktopPositions = [
    { top: "25%", left: "8%" },   // Top left
    { top: "75%", left: "8%" },   // Bottom left
    { top: "25%", right: "8%" },  // Top right
    { top: "75%", right: "8%" },  // Bottom right
  ];

  return (
    <main className="relative h-full w-full flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/team-info-bg.svg"
          alt="Background"
          fill
          className="object-cover brightness-110"
          priority
        />
      </div>

      {/* Navigation Buttons */}
      <div className="relative z-20 p-4 flex justify-between items-start">
        <button
          onClick={() => router.push("/")}
          className="w-16 h-16 sm:w-20 sm:h-20 bg-pink-500/70 hover:bg-pink-500/90 transition-colors flex items-center justify-center rounded-lg shadow-lg"
          title="Go Back"
        >
          <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[16px] border-t-transparent border-b-transparent border-r-white ml-1"></div>
        </button>

        <button
          onClick={() => router.push("/submission")}
          className="px-6 py-3 bg-pink-500/70 hover:bg-pink-500/90 transition-colors rounded-lg shadow-lg text-white font-semibold"
        >
          Submission
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 md:-mt-16">
        {/* Team Name */}
        <h1 className="text-pink-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
          {team.name}
        </h1>

        {/* Team Code */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-4 flex items-center gap-4 min-w-[280px] justify-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-mono text-white font-bold">
              {team.code}
            </span>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-200 hover:scale-105 text-white"
              title="Copy team code"
            >
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block lg:hidden w-full max-w-sm mx-auto space-y-6">
          {leader && (
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <Image
                  src="/text-box-team.svg"
                  alt="Leader box"
                  width={300}
                  height={100}
                  className="w-80 h-auto"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-lg font-bold text-white">{leader.name}</p>
                  <p className="text-sm text-white font-semibold">Leader</p>
                </div>
              </div>
              
            </div>
          )}

          {members.map((member, idx) => (
            <div key={member.email} className="flex flex-col items-center">
              <div className="relative">
                <Image
                  src="/text-box-team.svg"
                  alt="Member box"
                  width={280}
                  height={90}
                  className="w-72 h-auto"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-base font-semibold text-white">{member.name}</p>
                  <p className="text-sm text-white">Member</p>
                </div>
              </div>
              
            </div>
          ))}
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative w-full max-w-6xl mx-auto">
          <div className="relative w-full h-[500px] flex items-center justify-center">
            {/* Leader - Center */}
            {leader && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
                <div className="relative mb-4">
                  <Image
                    src="/text-box-team.svg"
                    alt="Leader box"
                    width={280}
                    height={100}
                    className="w-64 h-auto"
                    
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-lg font-bold text-white">{leader.name}</p>
                    <p className="text-sm text-white font-semibold">Leader</p>
                  </div>
                </div>
                
              </div>
            )}

            {/* Members - Corners */}
            {members.slice(0, 4).map((member, idx) => {
              const position = desktopPositions[idx];
              return (
                <div
                  key={member.email}
                  className="absolute flex flex-col items-center"
                  style={{
                    top: position.top,
                    left: position.left,
                    right: position.right,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="relative mb-2">
                    <Image
                      src="/text-box-team.svg"
                      alt="Member box"
                      width={220}
                      height={100}
                      className="w-64 h-auto"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-sm font-semibold text-white text-center p-2">
                        {member.name}
                      </p>
                    </div>
                  </div>
                  
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}