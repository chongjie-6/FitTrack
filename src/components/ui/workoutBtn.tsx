"use client";

import { useRouter } from "next/navigation";
import React from "react";

export function WorkOutBtn({
  onWorkoutCreateClick,
}: {
  onWorkoutCreateClick: (session_id: string) => Promise<void>;
}) {
  const router = useRouter();
  const onBtnClick = async () => {
    const session_id = crypto.randomUUID();
    onWorkoutCreateClick(session_id);
    router.push(`/workouts/${session_id}`);
  };
  return (
    <button
      onClick={onBtnClick}
      className="p-3 bg-gray-500 rounded-lg hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
    >
      Start Workout
    </button>
  );
}
