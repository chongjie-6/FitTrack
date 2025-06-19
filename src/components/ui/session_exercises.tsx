import SessionCard from "./session_card";
import { Tables } from "../../../database.types";
export async function SessionExercises({
  sessionExercises,
}: {
  sessionExercises: Array<
    Tables<"session_exercises"> & {
      exercises: Tables<"exercises">;
      session_sets: Array<Tables<"session_sets">>;
    }
  >;
}) {
  return (
    <>
      {sessionExercises.map((exercise) => (
        <SessionCard
          key={exercise.session_exercise_id}
          exercise={exercise}
        />
      ))}
    </>
  );
}
