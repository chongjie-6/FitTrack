"use server";
import { createClient } from "@/utils/supabase/server";
import getUser from "../getUser";
import { revalidateTag } from "next/cache";

export async function addExercisesAction(
  exercise_name: string,
  exercise_description: string
) {
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
      throw new Error("Not authenticated. Please log in to add exercises.");
    }

    const { error: workoutError } = await supabase
      .from("exercises")
      .insert({
        exercise_name: exercise_name,
        exercise_description: exercise_description,
        user_id: user.id,
      })
      .select()
      .single();

    if (workoutError) {
      throw new Error("There was an error adding your exercise.");
    }
    revalidateTag("exercises");
  } catch (e) {
    throw new Error(e as string);
  }
}
