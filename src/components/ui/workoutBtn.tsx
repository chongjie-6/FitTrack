"use client";
import React from "react";

export function WorkOutBtn({
  onWorkoutCreateClick,
}: {
  onWorkoutCreateClick: (session_id: string) => Promise<void>;
}) {
  const onBtnClick = async () => {
    const session_id = crypto.randomUUID();
    await onWorkoutCreateClick(session_id);
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
