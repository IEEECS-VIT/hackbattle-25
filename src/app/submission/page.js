"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitProject, teamDetails } from "../api/team";
import Toast from "../components/Toast";

export default function SubmissionPage() {
  const router = useRouter();
  const [team, setTeam] = useState(null);
  const [isLeader, setIsLeader] = useState(false);

  const [formData, setFormData] = useState({
    problem: "",
    github: "",
    figma: "",
    other: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch team details from API on mount
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const result = await teamDetails();
        setTeam(result.data);

        setFormData({
          problem: result.data.problem_stmt || "",
          github: result.data.github_link || "",
          figma: result.data.figma_link || "",
          other: result.data.other_files || "",
        });

        setIsLeader(result.data.isLeader);
      } catch (err) {
        console.error("Error fetching team details:", err);
      }
    };
    fetchTeam();
  }, []);

  const handleChange = (e) => {
    if (!isLeader) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLeader) return;

    let newErrors = {};
    if (!formData.problem.trim()) newErrors.problem = "Problem Statement is required";

    const githubRegex = /^(https?:\/\/)?(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    if (!formData.github.trim()) newErrors.github = "GitHub link is required";
    else if (!githubRegex.test(formData.github)) newErrors.github = "Enter a valid GitHub repository link";

    const figmaRegex = /^(https?:\/\/)?(www\.)?figma\.com\/(file|design)\/[A-Za-z0-9]+\/[A-Za-z0-9_-]+(\?.*)?$/;
    if (!formData.figma.trim()) newErrors.figma = "Figma link is required";
    else if (!figmaRegex.test(formData.figma)) newErrors.figma = "Enter a valid Figma file link";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const payload = {
        problem_stmt: formData.problem,
        github_link: formData.github,
        figma_link: formData.figma,
        other_files: formData.other || "", // optional string
      };

      await submitProject(payload);
      setTeam((prev) => ({ ...prev, ...payload }));
      window.dispatchEvent(
        new CustomEvent("showToast", { detail: { text: "Task submitted successfully ✅" } })
      );
    } catch (err) {
      console.error(err);
      alert("Error submitting form. Please try again.");
    }
  };

  if (!team) return <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
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
</div>;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black bg-cover bg-center" style={{ backgroundImage: "url('/bgm.png')" }}>
      <Toast />
      <img src="/Ghost_gif.gif" alt="top ghost" className="absolute top-6 right-6 w-28 h-28" />
      <img src="/Ghost_gif.gif" alt="bottom ghost" className="absolute bottom-6 left-6 w-28 h-28 scale-x-[-1]" />

      <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-center">
        SUBMISSION
      </h1>

      <div className="absolute top-4 left-4 z-20 p-4 flex justify-between items-start">
        <button onClick={() => router.push("/team")} className="w-16 h-16 sm:w-20 sm:h-20 bg-transparent flex items-center justify-center rounded-lg shadow-lg">
          <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-r-[16px] border-t-transparent border-b-transparent border-r-white ml-1"></div>
        </button>
      </div>

      <div className="mx-auto relative z-10 w-[40vw] bg-[#370000]/60 text-center text-white p-6 shadow-[0_0_8px_rgba(255,0,0,0.7)]">
        <form className="flex flex-col items-center gap-8 w-full" onSubmit={handleSubmit}>
          <div className="w-full">
            {errors.problem && <p className="text-yellow-400 text-xs text-center">{errors.problem}</p>}
            <select name="problem" value={formData.problem} onChange={handleChange} disabled={!isLeader} className="w-full bg-black/60 border-2 border-red-600 text-white text-xs font-[Press_Start_2P] px-2 py-3 text-center shadow-[0_0_5px_rgba(255,0,0,0.7)]">
              <option value="" disabled hidden>Choose one of the 10 problem statements</option>
              <option value="Problem 1">Problem 1</option>
              <option value="Problem 2">Problem 2</option>
              <option value="Problem 3">Problem 3</option>
            </select>
          </div>

          <div className="w-full">
            {errors.github && <p className="text-yellow-400 text-xs text-center">{errors.github}</p>}
            <input type="text" name="github" value={formData.github} onChange={handleChange} placeholder="GitHub Repository Link" disabled={!isLeader} className="w-full bg-transparent border border-red-600 text-white text-xs font-[Press_Start_2P] px-2 py-3 text-center shadow-[0_0_5px_rgba(255,0,0,0.7)] placeholder-white/80" />
          </div>

          <div className="w-full">
            {errors.figma && <p className="text-yellow-400 text-xs text-center">{errors.figma}</p>}
            <input type="text" name="figma" value={formData.figma} onChange={handleChange} placeholder="Figma File Link" disabled={!isLeader} className="w-full bg-transparent border border-red-600 text-white text-xs font-[Press_Start_2P] px-2 py-3 text-center shadow-[0_0_5px_rgba(255,0,0,0.7)] placeholder-white/80" />
          </div>

          <div className="w-full">
            <input type="text" name="other" value={formData.other} onChange={handleChange} placeholder="Links to Other Materials" disabled={!isLeader} className="w-full bg-transparent border border-red-600 text-white text-xs font-[Press_Start_2P] px-2 py-3 text-center shadow-[0_0_5px_rgba(255,0,0,0.7)] placeholder-white/80" />
          </div>

          <button type="submit" disabled={!isLeader} className={`mt-4 w-3/4 text-white font-[Press_Start_2P] text-xs px-4 py-2 shadow-[0_0_8px_rgba(255,0,0,0.9)] transition ${isLeader ? "bg-transparent border border-red-600 hover:scale-105" : "bg-black/50 border border-gray-600 cursor-not-allowed"}`}>
            {isLeader ? "SUBMIT" : "Only the leader can submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
