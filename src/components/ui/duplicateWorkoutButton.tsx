"use client";

import { DuplicateWorkoutAction } from "@/app/actions/sessions/duplicateWorkout";

export default function DuplicateWorkoutButton({
  sessionId,
}: {
  sessionId: string;
}) {
  const onDuplicateClick = () => {
    const response = DuplicateWorkoutAction(sessionId);
  };

  return (
    <button
      onClick={onDuplicateClick}
      className="text-blue-500 hover:text-blue-400 font-bold hidden sm:block w-fit cursor-pointer"
    >
      Duplicate Workout
    </button>
  );
}
