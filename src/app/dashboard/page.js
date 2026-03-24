"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import JoinTeam from "../components/JoinTeam";
import CustomCursor from "../components/Cursor";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/");
    }
  }, []);

  return (
    <div>
      <CustomCursor />
      <JoinTeam />
    </div>
  );
}
