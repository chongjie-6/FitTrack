"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import getUser from "../getUser";

export async function endWorkoutAction(session_id: string) {
  // Verify user
  await getUser();

  try {
    const end_date = new Date().toISOString();
    const supabase = await createClient();
    const { error: workoutError } = await supabase
      .from("sessions")
      .update({ session_end_date: end_date })
      .eq("session_id", session_id);

    if (workoutError) {
      throw new Error("Could not end your session.");
    }
    revalidatePath("/dashboard");
    revalidatePath(`/workouts/${session_id}`);
  } catch (e) {
    throw new Error(e as string);
  }
}
