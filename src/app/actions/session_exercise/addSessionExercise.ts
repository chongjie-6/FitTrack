"use server"
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addSessionExerciseAction(
  session_id: string,
  exercise_id: string
) {
  "use server"
  try{
    const supabase = await createClient();
    const { error: workoutError } = await supabase
      .from("session_exercises")
      .insert({ session_id: session_id, exercise_id: exercise_id })
    if (workoutError) {
      throw new Error(workoutError.message);
    }
    revalidatePath("/workouts");
  }
  catch(e){
    console.log(e)
  }
}
