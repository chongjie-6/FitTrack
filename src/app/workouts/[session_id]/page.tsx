"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function SessionPage() {
  const { session_id } = useParams();

  useEffect(() => {
    const fetchWorkoutSession = async () => {
      const response = await fetch(`/api/workouts/${session_id}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
    };
    fetchWorkoutSession();
  }, []);
  return <div>{session_id}</div>;
}
