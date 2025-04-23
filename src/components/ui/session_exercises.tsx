import SessionCard from "./session_card";
import { Tables } from "../../../database.types";
import { modifySetAction } from "@/app/actions/session_sets/modifySessionSet";
import { addSetAction } from "@/app/actions/session_sets/addSessionSets";
import { deleteSessionExerciseAction } from "@/app/actions/session_exercise/deleteSessionExercise";
import { removeSetAction } from "@/app/actions/session_sets/removeSessionSet";
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
          modifySetAction={modifySetAction}
          addSetAction={addSetAction}
          deleteSessionExerciseAction={deleteSessionExerciseAction}
          removeSetAction={removeSetAction}
        />
      ))}
    </>
  );
}
