"use client"
import { modifyWorkoutAction } from "@/app/actions/sessions/modifyWorkout";

export default function SessionDescriptionInput({
  session_notes,
  session_id,
}: {
  session_notes: string;
  session_id: string;
}) {
  return (
    <textarea
      placeholder="Notes"
      onChange={(e) =>
        modifyWorkoutAction(e?.target.value, "session_notes", session_id)
      }
      defaultValue={session_notes || ""}
      className="text-gray-300 italic my-2 input_field max-h-36 field-sizing-content"
    ></textarea>
  );
}
