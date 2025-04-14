import React from "react";
import SessionCard from "./session_card";
import { Tables } from "../../../database.types";
export function SessionExercises({
  sessionExercises,
  addSet,
  modifySet,
  removeSet,
  removeExercise,
}: {
  sessionExercises: Array<
    Tables<"session_exercises"> & {
      exercises: Tables<"exercises">;
      session_sets: Array<Tables<"session_sets">>;
    }
  >;
  addSet: (session_exercise_id: string, set_number: number) => void;
  modifySet: (
    set_id: string,
    value: number,
    field: "set_weight" | "set_reps" | "set_rest_time"
  ) => void;
  removeSet: (set_id: string) => void;
  removeExercise: (session_exercise_id: string) => void;
}) {
  return (
    <>
      {sessionExercises.map((exercise) => (
        <SessionCard
          key={exercise.session_exercise_id}
          exercise={exercise}
          addSet={addSet}
          removeSet={removeSet}
          modifySet={modifySet}
          removeExercise={removeExercise}
        />
      ))}
    </>
  );
}
