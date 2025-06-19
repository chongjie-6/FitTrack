"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import getUser from "../getUser";

export async function deleteWorkoutAction(session_id: string) {
  // Verify user
  await getUser();

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

    // Now we can delete from database
    const { error: deleteError } = await supabase
      .from("sessions")
      .delete()
      .eq("session_id", session_id);

    if (deleteError) {
      throw new Error("Could not delete your exercise.");
    }
    revalidatePath("/dashboard");
  } catch (e) {
    throw new Error(e as string);
  }
}
