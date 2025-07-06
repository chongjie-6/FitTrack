"use server";
import { createWorkoutAction } from "./createWorkout";
import { fetchSessionExercises } from "../session_exercise/getSessionExercises";
import { createClient } from "@/utils/supabase/server";
import { Tables } from "../../../../database.types";

export async function DuplicateWorkoutAction(sessionId: string) {
  try {
    // We need to create a new session based on an existing session
    const path = await createWorkoutAction();
    const newSessionId = path.split("/").at(2);

    // Now that we have created a new workout, we also need to associate this new workout
    // with the session_exercises corresponding to the old session.

    // Get the data from the session
    const oldSessionData = await fetchSessionExercises(sessionId);
    const supabase = await createClient();

    // Insert all the exercises
    oldSessionData.forEach(async (exercise) => {
      const response = await supabase
        .from("session_exercises")
        .insert({
          session_id: newSessionId,
          exercise_id: exercise.exercise_id,
          session_exercise_order: exercise.session_exercise_order,
        })
        .select("session_exercise_id")
        .single();

      if (response.status == 201) {
        exercise.session_sets.forEach(async (set: Tables<"session_sets">) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { set_id, session_exercise_id, ...rest } = set;
          await supabase.from("session_sets").insert({
            session_exercise_id: response.data?.session_exercise_id,
            ...rest,
          });
        });
      }
    });

    // Finally, once session has been duplicated we return the path
    return path;
  } catch (e) {
    throw new Error(e as string);
  }
}
