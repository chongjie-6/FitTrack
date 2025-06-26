"use server";
import { createClient } from "@/utils/supabase/server";
import getUser from "../getUser";
import { revalidatePath, revalidateTag } from "next/cache";

export async function modifyWorkoutAction(
  value: string,
  field: string,
  session_id: string
) {
  // Verify user
  await getUser();

  try {
    const supabase = await createClient();
    const { error: workoutError } = await supabase
      .from("sessions")
      .update({ [field]: value })
      .eq("session_id", session_id);

    if (workoutError) {
      throw new Error("Could not modify your session.");
    }
    revalidateTag("userSessions")
    revalidatePath(`/workouts/${session_id}`);
  } catch (e) {
    throw new Error(e as string);
  }
}
