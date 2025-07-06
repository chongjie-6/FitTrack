"use client";

import { DuplicateWorkoutAction } from "@/app/actions/sessions/duplicateWorkout";
import { useRouter } from "next/navigation";


export default function DuplicateWorkoutButton({
  sessionId,
}: {
  sessionId: string;
}) {
  const router = useRouter();
  const onDuplicateClick = async () => {
    const path = await DuplicateWorkoutAction(sessionId);
    router.push(path);
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
