"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export function WorkOutBtn({
  onWorkoutCreateClick,
}: {
  onWorkoutCreateClick: () => Promise<string | undefined>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onBtnClick = async () => {
    setLoading(true);
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
      {loading ? "Creating Workout" : "Create Workout"}
    </button>
  );
}
