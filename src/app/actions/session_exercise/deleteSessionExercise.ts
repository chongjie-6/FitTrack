"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import getUser from "../getUser";

export async function deleteSessionExerciseAction(
  session_exercise_id: string,
  session_id: string
) {
  // Verify user
  await getUser();

  try {
    const supabase = await createClient();
    const { error: deleteError } = await supabase
      .from("session_exercises")
      .delete()
      .eq("session_exercise_id", session_exercise_id);
    if (deleteError) {
      throw new Error(
        "There was an error deleting your exercise from the session."
      );
    }
    revalidatePath("/dashboard");
    revalidatePath(`/workouts/${session_id}`);
  } catch (e) {
    throw new Error(e as string);
  }
}
