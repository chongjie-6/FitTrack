"use client"
import { endWorkoutAction } from "@/app/actions/sessions/endWorkout";

export default function EndWorkoutBtn({ session_id }: { session_id: string }) {
  return (
    <button
      className="btn rounded-xl border-2 ring p-1"
      onClick={() => endWorkoutAction(session_id)}
    >
      End Workout
    </button>
  );
}
