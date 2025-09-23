"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { teamDetails, leaveTeam } from "../api/team";
import { useRouter } from "next/navigation";
import Toast from "../components/Toast";

export default function TeamPage() {
  const [team, setTeam] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
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

  const handleLeaveTeam = async () => {
    try {
      await leaveTeam();
      localStorage.removeItem("teamDetails");
      setToastMessage("Left team successfully ✅");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err) {
      console.error("Error leaving team:", err);
      setToastMessage("Failed to leave team");
    }
  };

  if (!team)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
        <video
          src="/loader.webm"
          autoPlay
          loop
          muted
          playsInline
          height={128}
          width={128}
          className="w-32 h-32"
        />
      </div>
    );

  const leader = team.members[0];
  const members = team.members.slice(1);

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <Image
        src="/team-info-bg.webp"
        alt="Background"
        fill
        className="object-cover -z-10 brightness-110 scale-100"
        priority
      />

      {/* Top Nav */}
      <div className="relative z-20 p-4 w-full flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0">
        <button
          onClick={() => router.push("/")}
          className="w-11 h-10 sm:w-15 sm:h-15 bg-pink-500/70 hover:bg-pink-500/90 transition-colors flex items-center justify-center rounded-lg shadow-lg"
          title="Go Back"
        >
          <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[16px] border-t-transparent border-b-transparent border-r-white ml-1"></div>
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
          <button
            onClick={handleLeaveTeam}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg"
          >
            Leave Team
          </button>
          <button
            onClick={() => router.push("/submission")}
            className="px-6 py-2 bg-pink-500/70 hover:bg-pink-500/90 transition-colors rounded-lg shadow-lg text-white font-semibold"
          >
            Submission
          </button>
        </div>
      </div>

      {/* Dragon */}
      <div className="relative w-full h-full hidden sm:block">
        <div className="absolute -top-4 right-2 sm:-top-6 sm:right-4 md:-top-8 md:right-6 lg:-top-10 lg:right-8 z-50">
          <Image
            src="/dragon.webp"
            alt="Dragon"
            width={220}
            height={80}
            className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 h-auto"
          />
        </div>
      </div>

      {/* Team Name + Code */}
      <div className="text-center text-white px-4 w-full mt-6">
        <h1 className="text-pink-500 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {team.name}
        </h1>

        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 flex items-center gap-3">
            <span className="text-xl sm:text-2xl md:text-3xl font-mono text-white">
              {team.code}
            </span>
            <button
              onClick={handleCopyCode}
              className="group relative p-2 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/30 hover:border-pink-500/50 transition-all duration-200 hover:scale-105"
              title="Copy team code"
            >
              {isCopied ? (
                <svg
                  className="w-5 h-5 text-green-400"
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
                  className="w-5 h-5 text-white group-hover:text-pink-300 transition-colors"
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
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block relative w-full max-w-[1200px] mx-auto">
        <div className="relative w-full h-[70vh] min-h-[500px]">
          {/* Leader Center */}
          {leader && (
            <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="relative mb-3">
                <Image
                  src="/text-box-team.svg"
                  alt="Leader box"
                  width={260}
                  height={90}
                  className="w-70 h-auto"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-center text-white">
                    {leader.name}
                  </p>
                  <p className="text-sm text-pink-200">Leader</p>
                </div>
              </div>
              <Image
                src="/purple_obj.svg"
                alt="Leader object"
                width={220}
                height={220}
                className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto"
              />
            </div>
          )}

          {/* Members around leader */}
          {members.slice(0, 4).map((member, idx) => {
            const positions = [
              "absolute top-[32%] left-[21%]",
              "absolute top-[50%] left-[0%]",
              "absolute top-[32%] left-[60%]",
              "absolute top-[50%] left-[81%]",
            ];
            return (
              <div
                key={member.email}
                className={`${positions[idx]} flex flex-col items-center`}
              >
                <div className="relative mb-2">
                  <Image
                    src="/text-box-team.svg"
                    alt="Member box"
                    width={200}
                    height={70}
                    className="w-60 h-auto"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xs text-center text-white">
                      {member.name}
                    </p>
                    <p className="text-xs text-pink-200">Member</p>
                  </div>
                </div>
                <Image
                  src="/purple_obj.svg"
                  alt="Member object"
                  width={160}
                  height={160}
                  className="w-24 sm:w-32 md:w-40 h-auto"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block sm:hidden w-full max-w-sm mx-auto space-y-6 px-2">
        {leader && (
          <div className="flex flex-col items-center">
            <div className="relative">
              <Image
                src="/text-box-team.svg"
                alt="Leader box"
                width={280}
                height={90}
                className="w-72 h-auto"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xs text-center font-bold">{leader.name}</p>
                <p className="text-sm text-pink-200">Leader</p>
              </div>
            </div>
          </div>
        )}
        {members.map((member) => (
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
                <p className="text-xs text-center text-white">{member.name}</p>
                <p className="text-sm text-pink-200">Member</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Copy Code Popup */}
      {isCopied && (
        <div className="fixed top-4 right-4 z-50 animate-bounce">
          <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
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

      {/* Toast for Leave Team */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage("")} />
      )}
    </main>
  );
}
