"use server";
import { createClient } from "@/utils/supabase/server";

import getUser from "../getUser";
import { revalidatePath } from "next/cache";

export async function addSessionExerciseAction(
  session_id: string,
  exercise_id: string
) {
  // Verify user
  await getUser();
  
  try {
    const supabase = await createClient();
    const { error: workoutError } = await supabase
      .from("session_exercises")
      .insert({ session_id: session_id, exercise_id: exercise_id });
    if (workoutError) {
      throw new Error(workoutError.message);
    }
    revalidatePath("/workouts")
  } catch (e) {
    throw new Error(e as string);
  }
}
