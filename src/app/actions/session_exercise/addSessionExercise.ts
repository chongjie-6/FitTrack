"use server"
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addSessionExerciseAction(
  session_id: string,
  exercise_id: string
) {
  const supabase = await createClient();
  const { data, error: workoutError } = await supabase
    .from("session_exercises")
    .insert({ session_id: session_id, exercise_id: exercise_id })
    .select("*, exercises(*)")
    .single();
  if (workoutError) {
    throw new Error("There was an error adding your exercise.");
  }
  revalidatePath("/");
  return data;
}
