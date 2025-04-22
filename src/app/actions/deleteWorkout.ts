"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteWorkoutAction(session_id: string) {
  try {
    // Delete a workout
    // Make sure the user is logged in
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    // First get all the exercises associated with this session
    const { data: data } = await supabase
      .from("session_exercises")
      .select("session_exercise_id")
      .eq("session_id", session_id)
      .select("session_exercise_id");

    // Now we get all the sets for all exercises associated with this session
    const session_exercises = data
      ? Object.values(data).map((exercise) => exercise.session_exercise_id)
      : [];

    const { data: setData } = await supabase
      .from("session_sets")
      .select("set_weight, set_reps")
      .in("session_exercise_id", session_exercises);

    // Now we can delete from database
    const { data: session_data, error: deleteError } = await supabase
      .from("sessions")
      .delete()
      .eq("session_id", session_id)
      .select("session_id, session_start_date, session_end_date")
      .single();

    if (!setData || !session_data || deleteError) {
      throw new Error("Could not delete your exercise.");
    }
    revalidatePath("/dsahboard")
    return { session_data: session_data, sets: setData };
  } catch (e) {
    console.log(e);
  }
}