"use client";

import { DuplicateWorkoutAction } from "@/app/actions/sessions/duplicateWorkout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DuplicateWorkoutButton({
  sessionId,
}: {
  sessionId: string;
}) {
  const router = useRouter();
  const [duping, setDuping] = useState(false);
  const onDuplicateClick = async () => {
    setDuping(true);
    const path = await DuplicateWorkoutAction(sessionId);
    setDuping(false);
    if (path) {
      toast("Workout has been duplicated successfully!");
      router.push(path);
    } else {
      toast(path);
    }
  };

  return (
    <button
      disabled={duping}
      onClick={onDuplicateClick}
      className="text-blue-500 hover:text-blue-400 font-bold hidden sm:block w-fit cursor-pointer"
    >
      {`${!duping ? `Duplicate Workout` : `Duplicating...`}`}
    </button>
  );
}
