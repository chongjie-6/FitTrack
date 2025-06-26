"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import getUser from "../getUser";

export async function deleteSessionExerciseAction(
  session_exercise_id: string,
  session_id: string
) {
  // Verify user
  await getUser();

  try {
    const supabase = await createClient();

    const data = await supabase
      .from("sessions")
      .select("*")
      .eq("session_id", session_id)
      .single();

    console.log(data.data);

    const { error: deleteError } = await supabase
      .from("session_exercises")
      .delete()
      .eq("session_exercise_id", session_exercise_id);
    if (deleteError) {
      throw new Error(
        "There was an error deleting your exercise from the session."
      );
    }

    const data2 = await supabase
      .from("sessions")
      .select("*")
      .eq("session_id", session_id)
      .single();

    console.log(data2.data);

    revalidatePath(`/workouts/${session_id}`);
    revalidateTag("totalWeights");
  } catch (e) {
    throw new Error(e as string);
  }
}
