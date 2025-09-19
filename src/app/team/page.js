"use client";
import Image from "next/image";
import { useState } from "react";
import { leaveTeam, removeMember } from "../api/user/route";

export default function TeamPage() {
  const [isCopied, setIsCopied] = useState(false);
  const teamCode = "TEAM123ABC"; // Replace with actual team code

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(teamCode);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handleRemove = async (uid) => {
    await removeMember(uid);
  };

  const handleLeave = async () => {
    await leaveTeam();
  };

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/team-info-bg.svg"
        alt="Background"
        fill
        className="object-cover -z-10 brightness-110 scale-100"
        priority
      />

      {/* Example control buttons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <button
          onClick={handleLeave}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
        >
          Leave Team
        </button>

        <button
          onClick={() => handleRemove("USER_ID_HERE")}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black"
        >
          Remove Member
        </button>
      </div>
      {/* Content */}
      <div className="text-center text-white px-4 w-full">
        {/* Title */}
        <div className="relative">
          <div className="relative top-5 sm:top-8 md:top-10 lg:top-12">
            <h1 className="text-pink-500 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
              TEAM NAME
            </h1>
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 flex items-center gap-2">
                <span className="text-sm sm:text-base md:text-lg font-mono text-white">
                  {teamCode}
                </span>
                <button
                  onClick={handleCopyCode}
                  className="group relative p-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-200 hover:scale-105"
                  title="Copy team code"
                >
                  {isCopied ? (
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4 text-white group-hover:text-pink-300 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                        strokeWidth="2"
                      />
                      <path
                        d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Copy Success Notification */}
            {isCopied && (
              <div className="fixed top-4 right-4 z-50 animate-bounce">
                <div className="bg-purple-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm font-medium">Team code copied!</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Dragon */}
        <div className="relative w-full h-full hidden sm:block">
          <div className="absolute -top-4 right-2 sm:-top-6 sm:right-4 md:-top-8 md:right-6 lg:-top-10 lg:right-8 z-50">
            <Image
              src="/dragon.webp"
              alt="Leader box"
              width={220}
              height={80}
              className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto"
            />
          </div>
        </div>

        {/* Mobile Layout - Only visible on small screens */}
        <div className="block sm:hidden w-full max-w-sm mx-auto space-y-6 px-2">
          {/* Team Leader */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/text-box-team.svg"
                alt="Leader box"
                width={280}
                height={90}
                className="w-72 h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
                <p className="text-base font-bold leading-tight">NAME</p>
                <p className="text-sm leading-tight">DESIGNATION</p>
              </div>
            </div>
          </div>

          {/* Team Member 1 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/text-box-team.svg"
                alt="Member box"
                width={280}
                height={90}
                className="w-72 h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
                <p className="text-sm font-semibold leading-tight">NAME</p>
                <p className="text-xs leading-tight">DESIGNATION</p>
              </div>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/text-box-team.svg"
                alt="Member box"
                width={280}
                height={90}
                className="w-72 h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
                <p className="text-sm font-semibold leading-tight">NAME</p>
                <p className="text-xs leading-tight">DESIGNATION</p>
              </div>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/text-box-team.svg"
                alt="Member box"
                width={280}
                height={90}
                className="w-72 h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
                <p className="text-sm font-semibold leading-tight">NAME</p>
                <p className="text-xs leading-tight">DESIGNATION</p>
              </div>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/text-box-team.svg"
                alt="Member box"
                width={280}
                height={90}
                className="w-72 h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
                <p className="text-sm font-semibold leading-tight">NAME</p>
                <p className="text-xs leading-tight">DESIGNATION</p>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:block relative w-full max-w-[1200px] mx-auto">
          {/* Responsive container with proper aspect ratio */}
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] min-h-[500px]">
            {/* Center Team Leader */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              {/* Leader Text Box - Above the purple object */}
              <div className="relative mb-2 sm:mb-3 md:mb-4">
                <Image
                  src="/text-box-team.svg"
                  alt="Leader box"
                  width={220}
                  height={80}
                  className="w-36 sm:w-44 md:w-56 lg:w-64 xl:w-70 h-auto"
                />
                <p className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs md:text-sm lg:text-base font-bold">
                  NAME DESIGNATION
                </p>
              </div>
              {/* Larger Leader Purple Object */}
              <Image
                src="/purple_obj.svg"
                alt="Leader"
                width={200}
                height={200}
                className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto"
              />
            </div>

            {/* Left Side - Top Member */}
            <div
              className="absolute 
            top-[52%] sm:top-[42%] md:top-[38%] lg:top-[35.3%] 
            left-[16%] sm:left-[22%] md:left-[28%] lg:left-[26%] 
            "
            >
              <div className="relative mt-1 sm:mt-2">
                <Image
                  src="/text-box-team.svg"
                  alt="Box"
                  width={180}
                  height={70}
                  className="w-36 sm:w-40 md:w-44 lg:w-44 xl:w-50 h-auto"
                />
                <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  NAME DESIGNATION
                </p>
              </div>
              <Image
                src="/purple_obj.svg"
                alt="Member"
                width={200}
                height={200}
                className="w-18 sm:w-26 md:w-34 lg:w-42 xl:w-50 h-auto"
              />
            </div>

            {/* Left Side - Bottom Member */}
            <div
              className="absolute 
            top-[68%] sm:top-[58%] md:top-[44%] lg:top-[51.3%] 
            left-[0%] sm:left-[10%] md:left-[8%] lg:left-[10%]  
            flex flex-col items-center 
            "
            >
              <div className="relative mt-1 sm:mt-2">
                <Image
                  src="/text-box-team.svg"
                  alt="Box"
                  width={180}
                  height={70}
                  className="w-36 sm:w-40 md:w-44 lg:w-44 xl:w-50 h-auto"
                />
                <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  NAME DESIGNATION
                </p>
              </div>
              <Image
                src="/purple_obj.svg"
                alt="Member"
                width={200}
                height={200}
                className="w-18 sm:w-26 md:w-34 lg:w-42 xl:w-50 h-auto"
              />
            </div>

            {/* Right Side - Top Member */}
            <div
              className="absolute 
            top-[52%] sm:top-[58%] md:top-[44%] lg:top-[35.3%] 
            left-[66%] sm:left-[80%] md:left-[75%] lg:left-[58%]  
            flex flex-col items-center 
            "
            >
              <div className="relative mt-1 sm:mt-2">
                <Image
                  src="/text-box-team.svg"
                  alt="Box"
                  width={180}
                  height={70}
                  className="w-36 sm:w-40 md:w-44 lg:w-44 xl:w-50 h-auto"
                />
                <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  NAME DESIGNATION
                </p>
              </div>
              <Image
                src="/purple_obj.svg"
                alt="Member"
                width={100}
                height={100}
                className="w-18 sm:w-26 md:w-34 lg:w-42 xl:w-50 h-auto"
              />
            </div>

            {/* Right Side - Bottom Member */}
            <div
              className="absolute 
            top-[68%] sm:top-[58%] md:top-[44%] lg:top-[51.3%] 
            left-[80%] sm:left-[80%] md:left-[8%] lg:left-[73%] 
            flex flex-col items-center"
            >
              <div className="relative mb-1 sm:mb-2">
                <Image
                  src="/text-box-team.svg"
                  alt="Box"
                  width={180}
                  height={70}
                  className="w-36 sm:w-40 md:w-44 lg:w-44 xl:w-50 h-auto"
                />
                <p className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm md:text-base">
                  NAME DESIGNATION
                </p>
              </div>
              <Image
                src="/purple_obj.svg"
                alt="Member"
                width={100}
                height={100}
                className="w-18 sm:w-26 md:w-34 lg:w-42 xl:w-50 h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}