"use client";

import { useRouter } from "next/navigation";
import React from "react";

export function WorkOutBtn({
  onWorkoutCreateClick,
}: {
  onWorkoutCreateClick: () => Promise<string>;
}) {
  const router = useRouter();
  const onBtnClick = async () => {
    const path = await onWorkoutCreateClick();
    if (path) {
      router.push(path);
    }
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
