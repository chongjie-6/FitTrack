"use server";
import { createClient } from "@/utils/supabase/server";
import getUser from "../getUser";
import { revalidateTag } from "next/cache";

export async function deleteExercisesAction(exercise_id: string) {
  // Verify user
  await getUser();

  try {
    const supabase = await createClient();

    // Get the current user from the session
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      throw new Error("Not authenticated. Please log in to delete exercises.");
    }

    const { error: workoutError } = await supabase
      .from("exercises")
      .delete()
      .eq("exercise_id", exercise_id);

    if (workoutError) {
      throw new Error("There was an error deleting your exercise.");
    }
    revalidateTag("exercises");
  } catch (e) {
    throw new Error(e as string);
  }
}
