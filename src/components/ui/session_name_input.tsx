"use client";
import { modifyWorkoutAction } from "@/app/actions/sessions/modifyWorkout";

export default function SessionNameInput({
  session_name,
  session_id,
}: {
  session_name: string;
  session_id: string;
}) {
  return (
    <input
      defaultValue={session_name || ""}
      onChange={(e) =>
        modifyWorkoutAction(e?.target.value || "", "session_name", session_id)
      }
      placeholder="Name"
      className="text-2xl font-bold input_field mt-5"
    ></input>
  );
}
